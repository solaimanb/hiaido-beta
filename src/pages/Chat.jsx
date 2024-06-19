import { ChatsContextProvider } from "@/context/ChatsContext";
import ChatContainer from "../components/ChatBot/ChatContainer";

const Chat = () => {
  console.log("Chat");
  return (
    <ChatsContextProvider>
      <div className="h-full focus-visible:outline-0 w-full" tabIndex={0}>
        <div className="h-full w-full flex flex-col">
          <ChatContainer />
        </div>
      </div>
    </ChatsContextProvider>
  );
};

export default Chat;
