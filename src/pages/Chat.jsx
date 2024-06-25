import { ChatsContextProvider } from "@/context/ChatsContext";
import ChatContainer from "../components/ChatBot/ChatContainer";
import { Helmet } from "react-helmet-async";

const Chat = () => {
  // console.log("Chat");
  return (
    <>
      <Helmet>
        <title>Hiaido | Chat</title>
      </Helmet>
      <ChatsContextProvider>
        <div className="h-full focus-visible:outline-0 w-full" tabIndex={0}>
          <div className="h-full w-full flex flex-col">
            <ChatContainer />
          </div>
        </div>
      </ChatsContextProvider>
    </>
  );
};

export default Chat;
