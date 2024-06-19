import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { GlobalStateContext } from "./GlobalStateContext";
import config from "@/config";
import { useAuthenticator } from "@aws-amplify/ui-react";
import {
  FetchUserAttributesOutput,
  fetchUserAttributes,
} from "aws-amplify/auth";
import { Chat, MemberAccount, Model } from "@/types";

interface ChatsContextType {
  state: {
    model: Model;
    query: string;
    newChat: Chat | null;
    chats: Chat[];
    memberAccounts: MemberAccount[] | null;
    currentMemberAccount: MemberAccount | null;
    error: string | null;
    userAttributes: FetchUserAttributesOutput | null;
  };
  setters: {
    setChats: Dispatch<SetStateAction<Chat[]>>;
    setError: Dispatch<SetStateAction<string | null>>;
    setModel: Dispatch<SetStateAction<Model>>;
    setNewChat: Dispatch<SetStateAction<Chat | null>>;
    setQuery: Dispatch<SetStateAction<string>>;
    setUserAttributes: Dispatch<
      SetStateAction<FetchUserAttributesOutput | null>
    >;
  };
  submitPrompt: (prompt: string) => Promise<void>;
  fetchResponse: () => void;
}
const defaultChatsContextValue: ChatsContextType = {
  state: {
    model: 0,
    chats: [],
    newChat: null,
    currentMemberAccount: null,
    query: "",
    memberAccounts: null,
    error: null,
    userAttributes: null,
  },
  setters: {
    setChats: () => {},
    setError: () => {},
    setModel: () => {},
    setNewChat: () => {},
    setQuery: () => {},
    setUserAttributes: () => {},
  },
  fetchResponse: () => {},
  submitPrompt: async () => {},
};
export const ChatsContext = createContext<ChatsContextType>(
  defaultChatsContextValue
);

interface ChatsContextProviderProps {
  children: React.ReactNode;
}

export const useChats = () => {
  const context = useContext(ChatsContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const ChatsContextProvider: React.FC<ChatsContextProviderProps> = ({
  children,
}) => {
  const { memberAccounts, currentMemberAccount } =
    useContext(GlobalStateContext);
  const [query, setQuery] = useState("");
  const [model, setModel] = useState<Model>(0);
  const [chats, setChats] = useState<Chat[]>([]);
  const [newChat, setNewChat] = useState<Chat | null>(null);
  const [error, setError] = useState<null | string>(null);
  const [userAttributes, setUserAttributes] =
    useState<FetchUserAttributesOutput | null>(null);

  const { user } = useAuthenticator();

  // const [chats, setChats] = useState([
  //   {
  //     query: "markdown test",
  //     result: markdownData,
  //   },
  // ]);

  // TODO: move to GlobalContext
  useEffect(() => {
    // TODO: add error if no email
    fetchUserAttributes().then((res) => {
      console.log(res);
      setUserAttributes(res);
    });
  }, []);

  const fetchResponse = async () => {
    if (!currentMemberAccount) return;
    if (!user.signInDetails?.loginId) return;
    if (!newChat) return;
    let url =
      model === 0
        ? `${config.baseURL}/get-response`
        : `${config.multiAgentURL}/chat`;
    let body =
      model === 0
        ? JSON.stringify({
            email: currentMemberAccount["email"],
            // TODO: may break during google sign in, fix it
            owner: user.signInDetails.loginId,
            query: newChat.query,
          })
        : JSON.stringify({
            email: currentMemberAccount["email"],
            // TODO: may break during google sign in, fix it
            owner: user.signInDetails.loginId,
            user_query: newChat.query,
          });
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });
    console.log("Completed request");
    const response_data = await response.json();
    console.log(response_data, response.status);
    if (!response.ok) {
      if (
        response.status == 400 &&
        response_data["detail"].includes("CLI not configured")
      ) {
        let configCliUrl =
          model === 0
            ? `${config.baseURL}/configure-cli`
            : `${config.multiAgentURL}/configure-cli`;
        const res = await fetch(configCliUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: currentMemberAccount["email"],
            owner: user.signInDetails.loginId,
          }),
        });
        const res_data = await res.json();
        console.log(res_data, res.status);
        if (res.ok) {
          await fetchResponse();
          return;
        } else {
          setError(res_data);
        }
      } else {
        console.log(response_data);
        // setError(response_data);
        let newChatCopy = structuredClone(newChat);
        if (response.status >= 500) {
          newChatCopy.error =
            response_data?.detail || "Internal server error occured.";
        } else {
          newChatCopy.error =
            response_data?.detail ||
            "An unknown error occured. Please try again later.";
        }
        newChatCopy.loading = false;
        setChats((prevChats) => [...prevChats.slice(0, -1), newChatCopy]);
        throw new Error(response_data);
      }
    }

    newChat.response = response_data.response;
    newChat.loading = false;

    setChats((prevChats) => [...prevChats.slice(0, -1), newChat]);
  };

  useEffect(() => {
    if (newChat) {
      fetchResponse();
    }
  }, [newChat]);

  const submitPrompt = async (prompt: string) => {
    if (!currentMemberAccount) return;

    // debounce if previous response is still loading
    if (chats.length > 0 && chats.at(-1)?.loading) return;

    try {
      // if template query is null then maybe user has typed the query
      const chat: Chat = {
        query: prompt,
        response: "",
        loading: true,
      };
      setChats((prevChats) => [...prevChats, chat]);
      setQuery("");
      setNewChat(chat);
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to fetch data");
    }
  };

  return (
    <ChatsContext.Provider
      value={{
        state: {
          model,
          query,
          chats,
          newChat,
          error,
          memberAccounts,
          currentMemberAccount,
          userAttributes,
        },
        setters: {
          setChats,
          setError,
          setModel,
          setNewChat,
          setQuery,
          setUserAttributes,
        },
        submitPrompt,
        fetchResponse,
      }}
    >
      {children}
    </ChatsContext.Provider>
  );
};
