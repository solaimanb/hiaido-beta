import { ChatsContextProvider, useChats } from "@/context/ChatsContext";
import ChatContainer from "../components/ChatBot/ChatContainer";
import { Helmet } from "react-helmet-async";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/ui-components/ui/dropdown-menu";
import { Button } from "@/ui-components/ui/button";
import { Bot, ChevronDown } from "lucide-react";
import { Model } from "@/types";
import { memo } from "react";
import { useGlobalState } from "@/context/GlobalStateContext";
import Loader from "@/components/Loader";

const Chat = () => {
  return (
    <ChatsContextProvider>
      <ChatPage />
    </ChatsContextProvider>
  );
};

const options = [
  {
    option_number: 1,
    style: "Simple and Professional",
    title: "HIAIDO Cloud Assistant",
    description: "Your one-stop shop for managing your cloud resources.",
  },
  {
    option_number: 2,
    style: "Warm and Welcoming",
    title: "Welcome to HIAIDO!",
    description:
      "Your friendly cloud assistant is here to help. How can I assist you today?",
  },
  {
    option_number: 3,
    style: "Highlight Capabilities",
    title: "HIAIDO Cloud Assistant: Intelligence at Your Fingertips",
    description: "Automate tasks, optimize resources, and gain insights.",
  },
  {
    option_number: 4,
    style: "Focus on Efficiency",
    title: "Get More Done with HIAIDO",
    description:
      "Your cloud management just got easier. Let's streamline your workflow.",
  },
];

const modelNames = [];
modelNames[Model.BASE] = "Normal";
modelNames[Model.CLAUDE_HAIKU] = "General Purpose";
modelNames[Model.CLAUDE_SONNET] = "Advanced";
modelNames[Model.MULTI_AGENT] = "Multiagent";
modelNames[Model.ADVANCED] = "Advanced";

const ChatPageHeader = memo(() => {
  const option = Math.floor(Math.random() * 4);
  return (
    <>
      <div>{options[option].title}</div>
      <div className="dark:text-neutral-500 text-neutral-500 text-sm">
        {options[option].description}
      </div>
    </>
  );
});

const ChatPage = () => {
  const {
    state: { model, chats },
    setters: { setModel },
  } = useChats();
  const { subscription } = useGlobalState();
  console.log(model);
  // console.log("Chat");

  if (!subscription) {
    return <Loader />;
  }

  return (
    <>
      <Helmet>
        <title>Hiaido | Chat</title>
      </Helmet>
      <div className="h-full focus-visible:outline-0 w-full" tabIndex={0}>
        <div className="h-full w-full flex flex-col">
          <div className="flex justify-between items-center px-10 sticky top-0 bg-neutral-50  dark:bg-[#1a1a1a] z-2">
            <div className="md:text-2xl text-3xl mt-6 text-left sticky top-0 mb-4 font-semibold text-black dark:text-neutral-300 dark:bg-[#1a1a1a] bg-neutral-50  z-10">
              {chats.length === 0 ? "" : <ChatPageHeader />}
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost">
                  Model: <div className="ml-2">{modelNames[model]}</div>
                  <ChevronDown className="size-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-fit">
                <DropdownMenuLabel>Models</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {subscription.plan !== "PLAYGROUND" ? (
                  <DropdownMenuRadioGroup
                    value={model}
                    onValueChange={setModel}
                  >
                    <DropdownMenuRadioItem
                      className="flex items-center gap-1"
                      value={Model.CLAUDE_HAIKU}
                    >
                      <Bot className="size-4" />
                      {modelNames[Model.CLAUDE_HAIKU]}
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                ) : (
                  <DropdownMenuRadioGroup
                    value={model}
                    onValueChange={setModel}
                  >
                    <DropdownMenuRadioItem
                      className="flex items-center gap-1"
                      value={Model.CLAUDE_HAIKU}
                    >
                      <Bot className="size-4" />
                      {modelNames[Model.CLAUDE_HAIKU]}
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem
                      className="flex items-center gap-1"
                      value={Model.CLAUDE_SONNET}
                    >
                      <Bot className="size-4" />
                      {modelNames[Model.CLAUDE_SONNET]}
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                )}
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
