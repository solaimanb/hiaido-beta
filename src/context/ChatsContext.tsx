import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { GlobalStateContext } from "./GlobalStateContext";
import config from "@/config";
import { useAuthenticator } from "@aws-amplify/ui-react";

interface ChatsContextType {}
const defaultChatsContextValue: ChatsContextType = {};
export const ChatsContext = createContext<ChatsContextType>({});

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

// TODO: fix
interface newChatType {
  prompt: string;
  response: string;
  loading: boolean;
}

export const ChatsContextProvider: React.FC<ChatsContextProviderProps> = ({
  children,
}) => {
  const { memberAccounts, currentMemberAccount } =
    useContext(GlobalStateContext);
  const [prompt, setPrompt] = useState("");
  const [chats, setChats] = useState<newChatType[]>([]);
  const [newChat, setNewChat] = useState<newChatType | null>(null);
  const [error, setError] = useState<null | string>(null);

  const { user } = useAuthenticator();

  // const [chats, setChats] = useState([
  //   {
  //     query: "markdown test",
  //     result: markdownData,
  //   },
  // ]);

  useEffect(() => {
    const fetchResponse = async () => {
      if (!newChat) return;
      console.log(newChat);
      const response = await fetch(`${config.baseURL}/get-response`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // TODO: fix
          email: currentMemberAccount ? currentMemberAccount["email"] : "",
          // TODO: may break during google sign in, fix it
          owner: user.signInDetails?.loginId,
          query: newChat.prompt,
        }),
      });
      console.log("Completed request");
      const response_data = await response.json();
      console.log(response_data);
      if (!response.ok) {
        if (
          response.status == 400 &&
          response_data["detail"].includes("CLI not configured")
        ) {
          const res = await fetch(`${config.baseURL}/configure-cli`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              // TODO: fix
              email: currentMemberAccount ? currentMemberAccount["email"] : "",
              owner: user.signInDetails?.loginId,
            }),
          });
          const res_data = await res.json();
          console.log(res_data);
          if (res.ok) {
            await fetchResponse();
            return;
          } else {
            setError(res_data);
          }
        } else {
          throw new Error(response_data);
        }
      }

      newChat.response = response_data.response;
      newChat.loading = false;

      setChats((prevChats) => [...prevChats.slice(0, -1), newChat]);
    };

    if (newChat) {
      fetchResponse();
    }
  }, [newChat]);

  return <ChatsContext.Provider value={{}}>{children}</ChatsContext.Provider>;
};
