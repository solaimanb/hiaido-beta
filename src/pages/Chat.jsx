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
import toast from "react-hot-toast";

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
modelNames[Model.BASIC] = "Basic";
// modelNames[Model.BASE] = "Normal";
modelNames[Model.GENERAL_PURPOSE] = "General Purpose";
modelNames[Model.ADVANCED] = "Advanced";
// modelNames[Model.MULTI_AGENT] = "Multiagent";
// modelNames[Model.ADVANCED] = "Advanced";

const ModelSelectionDropdownMenu = () => {
  const {
    state: { model },
    setters: { setModel },
  } = useChats();
  const { subscription } = useGlobalState();

  if (!subscription) {
    return <Loader />;
  }

  return (
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
        <DropdownMenuRadioGroup value={model} onValueChange={setModel}>
          <DropdownMenuRadioItem
            className="flex items-center gap-1"
            value={Model.BASIC}
          >
            <Bot className="size-4" />
            {modelNames[Model.BASIC]}
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            className="flex items-center gap-1"
            value={Model.GENERAL_PURPOSE}
            style={{
              color: subscription.plan === "PLAYGROUND" ? "#999999" : "",
            }}
            onClick={(e) => {
              if (subscription.plan === "PLAYGROUND") {
                e.preventDefault();
                toast.error("You need to upgrade your plan");
              }
            }}
          >
            <Bot className="size-4" />
            {modelNames[Model.GENERAL_PURPOSE]}
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            className="flex items-center gap-1"
            value={Model.ADVANCED}
            style={{
              color: subscription.plan === "PLAYGROUND" && "#999999",
            }}
            onClick={(e) => {
              if (subscription.plan === "PLAYGROUND") {
                e.preventDefault();
                toast.error("You need to upgrade your plan");
              }
            }}
          >
            <Bot className="size-4" />
            {modelNames[Model.ADVANCED]}
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

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
    state: { chats },
  } = useChats();
  const { subscription } = useGlobalState();

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
          <div className="flex justify-end md:justify-between items-center px-2 md:px-10 sticky top-0 bg-neutral-50  dark:bg-[#1a1a1a] z-2">
            <div className="hidden md:block md:text-2xl text-3xl mt-6 text-left sticky top-0 mb-4 font-semibold text-black dark:text-neutral-300 dark:bg-[#1a1a1a] bg-neutral-50  z-10">
              {chats.length === 0 ? "" : <ChatPageHeader />}
            </div>
            <ModelSelectionDropdownMenu />
          </div>
          <ChatContainer />
        </div>
      </div>
    </>
  );
};

export default Chat;
