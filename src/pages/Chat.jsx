import { ChatsContextProvider, useChats } from "@/context/ChatsContext";
import ChatContainer from "../components/ChatBot/ChatContainer";
import { Helmet } from "react-helmet-async";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/ui-components/ui/dropdown-menu";
import { Button } from "@/ui-components/ui/button";
import { Bot } from "lucide-react";

const Chat = () => {
  return (
    <ChatsContextProvider>
      <ChatPage />
    </ChatsContextProvider>
  );
};

const ChatPage = () => {
  const {
    state: { model },
    setters: { setModel },
  } = useChats();
  console.log(model);
  // console.log("Chat");
  return (
    <>
      <Helmet>
        <title>Hiaido | Chat</title>
      </Helmet>
      <div className="h-full focus-visible:outline-0 w-full" tabIndex={0}>
        <div className="h-full w-full flex flex-col">
          <div className="flex justify-between items-center px-10 sticky top-0 bg-neutral-50  dark:bg-[#1a1a1a] z-2">
            <div className="md:text-2xl p-4 pt-6 text-3xl text-center sticky top-0 pb-4 font-semibold text-black dark:text-neutral-300 dark:bg-[#1a1a1a] bg-neutral-50  z-10">
              Welcome To HIAIDO Cloud Assistant.
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button>
                  {model === 1 ? "Multiagent model" : "Normal model"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-40">
                <DropdownMenuLabel>Model</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={model} onValueChange={setModel}>
                  <DropdownMenuRadioItem
                    className="flex items-center gap-1"
                    value={0}
                  >
                    <Bot className="size-4" />
                    Normal
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem
                    className="flex items-center gap-1 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 animated-backgroun"
                    value={1}
                  >
                    <Bot className="size-4" />
                    Multiagent
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
                {/* <DropdownMenuItem className="p-3" onClick={() => setModel(0)}>
                  Normal chatbot
                </DropdownMenuItem>
                <DropdownMenuItem className="p-3" onClick={() => setModel(1)}>
                  Multiagent chatbot
                </DropdownMenuItem> */}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <ChatContainer />
        </div>
      </div>
    </>
  );
};

export default Chat;
