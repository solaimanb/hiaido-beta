import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { GlobalStateContext, useGlobalState } from "./GlobalStateContext";
import config from "@/config";
import {
  Chat,
  MemberAccounts,
  Model,
  ManagedMemberAccount,
  ConnectedAccount,
} from "@/types";
import toast from "react-hot-toast";
import { getChats, openDB, replaceChats } from "@/utils/indexed-db";

interface ChatsContextType {
  state: {
    model: Model;
    query: string;
    newChat: Chat | null;
    chats: Chat[];
    memberAccounts: MemberAccounts | null;
    currentMemberAccount: ManagedMemberAccount | ConnectedAccount | null;
    error: string | null;
    idb: IDBDatabase | null;
  };
  setters: {
    setChats: Dispatch<SetStateAction<Chat[]>>;
    setError: Dispatch<SetStateAction<string | null>>;
    setModel: (model: Model) => void;
    setNewChat: Dispatch<SetStateAction<Chat | null>>;
    setQuery: Dispatch<SetStateAction<string>>;
  };
  submitPrompt: (prompt: string) => Promise<void>;
  fetchResponse: () => void;
}
const defaultChatsContextValue: ChatsContextType = {
  state: {
    model: Model.BASIC,
    chats: [],
    newChat: null,
    currentMemberAccount: null,
    query: "",
    memberAccounts: null,
    error: null,
    idb: null,
  },
  setters: {
    setChats: () => {},
    setError: () => {},
    setModel: () => {},
    setNewChat: () => {},
    setQuery: () => {},
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
    throw new Error("useChats must be used within an ChatsContextProvider");
  }
  return context;
};

export const ChatsContextProvider: React.FC<ChatsContextProviderProps> = ({
  children,
}) => {
  const { memberAccounts, currentMemberAccount } = useGlobalState();
  const [query, setQuery] = useState("");
  const [model, _setModel] = useState<Model>(
    parseInt(localStorage.getItem("model") || Model.BASIC.toString())
  );
  const [chats, setChats] = useState<Chat[]>([]);
  const [newChat, setNewChat] = useState<Chat | null>(null);
  const [error, setError] = useState<null | string>(null);
  const [loadingChats, setLoadingChats] = useState(true);
  const [idb, setIdb] = useState<IDBDatabase | null>(null);

  const setModel = (model: Model) => {
    localStorage.setItem("model", model.toString());
    _setModel(model);
  };
  useEffect(() => {
    if (!(model in [Model.BASIC, Model.GENERAL_PURPOSE, Model.ADVANCED])) {
      setModel(Model.BASIC);
    }
  }, []);

  const { userAttributes } = useGlobalState();

  // const [chats, setChats] = useState([
  //   {
  //     query: "markdown test",
  //     result: markdownData,
  //   },
  // ]);

  useEffect(() => {
    const email: string = currentMemberAccount?.email as string;
    console.log(email);
    openDB().then(async (db) => {
      setIdb(db);
      // try {
      const dbChats = await getChats(db, email);
      setChats(dbChats);
      // } catch (err) {
      //   // toast.error("Could not fetch chats");
      //   console.log(err);
      // }
    });
  }, [currentMemberAccount]);

  const fetchResponse = async () => {
    if (!currentMemberAccount) return;
    if (!userAttributes?.email) {
      toast.error("An error occured. Please try again later.", {
        position: "bottom-right",
      });
      console.error("userAttributes.email not found.", userAttributes);
      return;
    }
    if (!newChat) return;
    if (newChat.query === "") {
      toast.error("Query cannot be empty");
      return;
    }
    let url, body, configCliUrl;
    switch (model) {
      case Model.BASIC:
        url = `${config.baseURL}/get-response/basic`;
        body = JSON.stringify({
          email:
            currentMemberAccount["email"] || currentMemberAccount["externalId"],
          owner: userAttributes.email,
          query: newChat.query,
        });
        configCliUrl = `${config.baseURL}/configure-cli`;
        break;
      case Model.GENERAL_PURPOSE:
        url = `${config.baseURL}/get-response/general-purpose`;
        body = JSON.stringify({
          email:
            currentMemberAccount["email"] || currentMemberAccount["externalId"],
          owner: userAttributes.email,
          query: newChat.query,
        });
        configCliUrl = `${config.baseURL}/configure-cli`;
        break;
      case Model.ADVANCED:
        url = `${config.baseURL}/get-response/advanced`;
        body = JSON.stringify({
          email:
            currentMemberAccount["email"] || currentMemberAccount["externalId"],
          owner: userAttributes.email,
          query: newChat.query,
        });
        configCliUrl = `${config.baseURL}/configure-cli`;
        break;
      case Model.GPT_4O_MINI:
        url = `${config.baseURL}/get-response/gpt4o-mini`;
        body = JSON.stringify({
          email:
            currentMemberAccount["email"] || currentMemberAccount["externalId"],
          owner: userAttributes.email,
          query: newChat.query,
        });
        configCliUrl = `${config.baseURL}/configure-cli`;
        break;
      case Model.CLAUDE_HAIKU:
        url = `${config.baseURL}/get-response/claude-haiku`;
        body = JSON.stringify({
          email:
            currentMemberAccount["email"] || currentMemberAccount["externalId"],
          owner: userAttributes.email,
          query: newChat.query,
        });
        configCliUrl = `${config.baseURL}/configure-cli`;
        break;
      default:
        url = `${config.baseURL}/get-response`;
        body = JSON.stringify({
          email:
            currentMemberAccount["email"] || currentMemberAccount["externalId"],
          owner: userAttributes.email,
          query: newChat.query,
        });
        configCliUrl = `${config.baseURL}/configure-cli`;
    }

    console.log(url, configCliUrl, model);

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
        const res = await fetch(configCliUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body,
        });
        const res_data = await res.json();
        console.log(res_data, res.status);
        if (res.ok) {
          await fetchResponse();
          return;
        } else {
          let newChatCopy = structuredClone(newChat);
          newChatCopy.error = "An error occured. Please try again later.";
          setError(res_data);
          newChatCopy.loading = false;
          setChats((prevChats) => [...prevChats.slice(0, -1), newChatCopy]);
          throw new Error(res_data);
        }
      } else {
        console.log(response_data);
        let newChatCopy = structuredClone(newChat);
        if (response.status >= 500) {
          newChatCopy.error = "Internal server error";
        } else {
          newChatCopy.error =
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
    // TODO: fix
    if (idb && currentMemberAccount?.email) {
      replaceChats(idb, currentMemberAccount.email, chats);
    }
  };

  useEffect(() => {
    if (newChat) {
      fetchResponse();
    }
  }, [newChat]);

  // useEffect(() => {
  //   // // TODO: fix
  //   if (idb && currentMemberAccount?.email) {
  //     replaceChats(idb, currentMemberAccount.email, chats);
  //   }
  // }, [chats, currentMemberAccount]);

  const submitPrompt = async (prompt: string) => {
    if (prompt === "") {
      toast.error("Query cannot be empty");
      return;
    }
    if (!currentMemberAccount) {
      toast.error("You need to create a member account first.");
      return;
    }

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
          idb,
        },
        setters: {
          setChats,
          setError,
          setModel,
          setNewChat,
          setQuery,
        },
        submitPrompt,
        fetchResponse,
      }}
    >
      {children}
    </ChatsContext.Provider>
  );
};
