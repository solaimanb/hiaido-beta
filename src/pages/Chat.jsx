// Built-in modules
import { useState, useEffect, useRef } from "react";

// External modules
import ReactMarkdown from "react-markdown";
import { Flex, Button, Avatar, Box, Text } from "@radix-ui/themes";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  gruvboxDark,
  darcula,
  coldarkDark,
  duotoneDark,
  dracula,
  oneDark,
  materialDark,
  nord,
  ghcolors,
  holiTheme,
} from "react-syntax-highlighter/dist/esm/styles/prism";

// Internal modules
import Dashboard from "../components/ChatBot/Dashboard";

// Assets
import logo from "/hiaido-logo.png";

import {
  ArrowUpTrayIcon,
  ChatBubbleLeftRightIcon,
  CloudArrowUpIcon,
  Cog6ToothIcon,
  CurrencyDollarIcon,
  MoonIcon,
  PresentationChartLineIcon,
  QuestionMarkCircleIcon,
  QueueListIcon,
  Squares2X2Icon,
  SquaresPlusIcon,
  SunIcon,
  TicketIcon,
  UserIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";
import * as Menubar from "@radix-ui/react-menubar";
import { motion } from "framer-motion";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

// const sampleChat = [
//   {
//     query: "Deploy website to S3",
//     result:
//       "Make sure to replace www with the path to your local directory that contains your website's static files. \n1. The index.html inside that directory will be used as the entry point (index document) for your S3 website. \n\n2.After deploying this program with Pulumi, the websiteUrl output will provide you with the URL to access your static website.\nMake sure to replace www with the path to your local directory that contains your website's static files. The index.html inside that directory will be used as the entry point (index document) for your S3 website. After deploying this program with Pulumi, the websiteUrl output will provide you with the URL to access your static website. Make sure to replace www with the path to your local directory that contains your website's static files. The index.html inside that directory will be used as the entry point (index document) for your S3 website. After deploying this program with Pulumi, the websiteUrl output will provide you with the URL to access your static website. Make sure to replace www with the path to your local directory that contains your website's static files. The index.html inside that directory will be used as the entry point (index document) for your S3 website. After deploying this program with Pulumi, the websiteUrl output will provide you with the URL to access your static website. Make sure to replace www with the path to your local directory that contains your website's static files. The index.html inside that directory will be used as the entry point (index document) for your S3 website. After deploying this program with Pulumi, the websiteUrl output will provide you with the URL to access your static website.",
//   },
//   {
//     query: "Deploy website to S3",
//     result:
//       "Make sure to replace www with the path to your local directory that contains your website's static files. The index.html inside that directory will be used as the entry point (index document) for your S3 website. After deploying this program with Pulumi, the websiteUrl output will provide you with the URL to access your static website. Make sure to replace www with the path to your local directory that contains your website's static files. The index.html inside that directory will be used as the entry point (index document) for your S3 website. After deploying this program with Pulumi, the websiteUrl output will provide you with the URL to access your static website. Make sure to replace www with the path to your local directory that contains your website's static files. The index.html inside that directory will be used as the entry point (index document) for your S3 website. After deploying this program with Pulumi, the websiteUrl output will provide you with the URL to access your static website. Make sure to replace www with the path to your local directory that contains your website's static files. The index.html inside that directory will be used as the entry point (index document) for your S3 website. After deploying this program with Pulumi, the websiteUrl output will provide you with the URL to access your static website. Make sure to replace www with the path to your local directory that contains your website's static files. The index.html inside that directory will be used as the entry point (index document) for your S3 website. After deploying this program with Pulumi, the websiteUrl output will provide you with the URL to access your static website.",
//   },
//   {
//     query: "Deploy website to S3",
//     result:
//       "Make sure to replace www with the path to your local directory that contains your website's static files. The index.html inside that directory will be used as the entry point (index document) for your S3 website. After deploying this program with Pulumi, the websiteUrl output will provide you with the URL to access your static website. Make sure to replace www with the path to your local directory that contains your website's static files. The index.html inside that directory will be used as the entry point (index document) for your S3 website. After deploying this program with Pulumi, the websiteUrl output will provide you with the URL to access your static website. Make sure to replace www with the path to your local directory that contains your website's static files. The index.html inside that directory will be used as the entry point (index document) for your S3 website. After deploying this program with Pulumi, the websiteUrl output will provide you with the URL to access your static website. Make sure to replace www with the path to your local directory that contains your website's static files. The index.html inside that directory will be used as the entry point (index document) for your S3 website. After deploying this program with Pulumi, the websiteUrl output will provide you with the URL to access your static website. Make sure to replace www with the path to your local directory that contains your website's static files. The index.html inside that directory will be used as the entry point (index document) for your S3 website. After deploying this program with Pulumi, the websiteUrl output will provide you with the URL to access your static website.",
//   },
//   {
//     query: "Deploy website to S3",
//     result:
//       "Make sure to replace www with the path to your local directory that contains your website's static files. The index.html inside that directory will be used as the entry point (index document) for your S3 website. After deploying this program with Pulumi, the websiteUrl output will provide you with the URL to access your static website. Make sure to replace www with the path to your local directory that contains your website's static files. The index.html inside that directory will be used as the entry point (index document) for your S3 website. After deploying this program with Pulumi, the websiteUrl output will provide you with the URL to access your static website. Make sure to replace www with the path to your local directory that contains your website's static files. The index.html inside that directory will be used as the entry point (index document) for your S3 website. After deploying this program with Pulumi, the websiteUrl output will provide you with the URL to access your static website. Make sure to replace www with the path to your local directory that contains your website's static files. The index.html inside that directory will be used as the entry point (index document) for your S3 website. After deploying this program with Pulumi, the websiteUrl output will provide you with the URL to access your static website. Make sure to replace www with the path to your local directory that contains your website's static files. The index.html inside that directory will be used as the entry point (index document) for your S3 website. After deploying this program with Pulumi, the websiteUrl output will provide you with the URL to access your static website.",
//   },
//   {
//     query: "send sms notification using python boto3 adn sns",
//     result:
//       "Here are the steps to send SMS notifications using Python, Boto3 and Amazon SNS: \n1. Install boto3 library. \n\n ```python pip install boto3 ```\n\n 2. Import boto3 SDK and setup SNS client\n\n ```python import boto3 sns = boto3.client('sns') ```\n\n 3. Create a new SNS topic to send SMS messages\n\n ```python response = sns.create_topic(Name=\"my-sms-topic\") topic_arn = response[\"TopicArn\"] ```\n\n 4. Subscribe a phone number to the SNS topic \n\n```python sns.subscribe(TopicArn=topic_arn, Protocol=\"sms\", Endpoint=\"+1234567890\") ```\n\n 5. Publish a message to the SNS topic to send SMS\n\n ```python response = sns.publish( TopicArn=topic_arn, Message=\"Hello from SNS!\", MessageAttributes={ 'AWS.SNS.SMS.SenderID': { 'DataType': 'String', 'StringValue': 'MySenderID' } } ) ```\n\n Make sure to replace the phone number and specify a sender ID. This will send an SMS notification to the subscribed number. Let me know if you need any clarification or have additional questions!",
//   },
// ];

const Chat = () => {
  return (
    <div className="h-full flex">
      <div className="p-3">
        <Navbar />
      </div>
      <PanelGroup direction="horizontal">
        <Panel defaultSize={40} className="max-w-[1100px] min-w-[720px]">
          <div className="pr-14 w-full px-4 pl-10">
            <ChatContainer />
          </div>
        </Panel>
        <PanelResizeHandle />
        <Panel className="min-w-[600px]">
          <div>
            <Dashboard />
          </div>
        </Panel>
      </PanelGroup>
    </div>
  );
};

const Navbar = () => {
  const [navTabIndex, setNavTabIndex] = useState();
  const [activeTabIndex, setActiveTabIndex] = useState(1);
  const data = [
    { label: "Light", icon: <SunIcon className="w-6 pr-1" /> },
    { label: "Dark", icon: <MoonIcon className="w-6 pr-1" /> },
  ];
  const sliceIndex = 8;
  const navbarData = [
    { label: "Dashboard", icon: <Squares2X2Icon className="w-8 h-8 pr-3" /> },
    {
      label: "Chat",
      icon: <ChatBubbleLeftRightIcon className="w-8 h-8 pr-3" />,
    },
    {
      label: "Usage Analytics",
      icon: <PresentationChartLineIcon className="w-8 h-8 pr-3" />,
    },
    {
      label: "Deployments",
      icon: <CloudArrowUpIcon className="w-8 h-8 pr-3" />,
    },
    { label: "Scheduler", icon: <QueueListIcon className="w-8 h-8 pr-3" /> },
    {
      label: "Feature requests",
      icon: <SquaresPlusIcon className="w-8 h-8 pr-3" />,
    },
    { label: "User management", icon: <UsersIcon className="w-8 h-8 pr-3" /> },
    { label: "Billing", icon: <CurrencyDollarIcon className="w-8 h-8 pr-3" /> },
    {
      label: "Tickets",
      icon: <TicketIcon className="w-8 h-8 pr-3" />,
    },
    { label: "Settings", icon: <Cog6ToothIcon className="w-8 h-8 pr-3" /> },
    {
      label: "Help",
      icon: <QuestionMarkCircleIcon className="w-8 h-8 pr-3" />,
    },
    // { label: "Pricing", icon: <CurrencyDollarIcon className="w-8 h-8 pr-3" /> },
    // { label: "Settings", icon: <Cog6ToothIcon className="w-8 h-8 pr-3" /> },
  ];

  return (
    <div className="bg-neutral-800 relative w-full h-full p-3 rounded-lg text-[13px] flex flex-col">
      <div className="flex items-center my-4 text-2xl">
        <img className="w-8 h-8 mr-2" src={logo} alt="Brand Logo" />
        <h1>HiAiDo</h1>
      </div>
      <div className="divide-neutral-600 h-full">
        <div className="text-neutral-400 my-2 space-y-1">
          <div className="text-neutral-500 my-2 text-xs font-semibold">
            MAIN
          </div>
          {navbarData.slice(0, sliceIndex).map((item, i) => {
            return (
              <button
                key={item.id || i}
                onClick={() => setNavTabIndex(i)}
                className={`rounded-lg flex items-center outline-none w-full p-[1px] px-1 ${
                  i == navTabIndex
                    ? "bg-neutral-600 text-white"
                    : "hover:bg-neutral-700 duration-300 hover:text-neutral-300"
                }`}
              >
                {item.icon}
                <span className="text-left">{item.label}</span>
              </button>
            );
          })}
        </div>
        <div className="h-[1px] bg-neutral-700/75 my-2"></div>
        <div className="text-neutral-400 pl-1 mt-6 h-full space-y-1">
          <div className="text-neutral-500 my-2 text-xs font-semibold">
            SUPPORT
          </div>
          {navbarData.slice(sliceIndex).map((item, i) => {
            return (
              <button
                key={item.id || i}
                onClick={() => setNavTabIndex(i + 5)}
                className={`rounded-lg flex items-center outline-none w-full p-[1px] px-1 ${
                  i + 5 == navTabIndex
                    ? "bg-neutral-600 text-white"
                    : "hover:bg-neutral-700 duration-300 hover:text-neutral-300"
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col h-fit items-center justify-end mx-3 space-y-2">
        <Menubar.Root className="flex bg-neutral-900 w-fit p-[5px] rounded-lg shadow-blackA4 space-x-1 justify-start">
          {data.map((item, i) => {
            return (
              <Menubar.Menu key={item.id || i}>
                <Menubar.Trigger
                  onClick={() => {
                    setActiveTabIndex(i);
                  }}
                  className={`py-[7px] w-fit px-[12px] outline-none select-none font-medium leading-none rounded-lg relative ${
                    i == activeTabIndex ? "" : "hover:bg-neutral-600/35"
                  }`}
                  style={{
                    WebkitTapHighlightColor: "transparent",
                  }}
                >
                  <div className="flex items-center justify-center">
                    {item.icon}
                    <span className="text-sm">{item.label}</span>
                    {activeTabIndex == i && (
                      <motion.span
                        layoutId="theme-bubble"
                        className="bg-cyan-100 mix-blend-difference absolute inset-0 z-10 rounded-lg"
                        transition={{
                          type: "spring",
                          bounce: 0.1,
                          duration: 0.6,
                        }}
                      />
                    )}
                  </div>
                </Menubar.Trigger>
              </Menubar.Menu>
            );
          })}
        </Menubar.Root>
        <div className="h-[1px] bg-neutral-600"></div>
        <Flex
          gap="2"
          align="center"
          className="!border-t-[1px] !border-neutral-600 pt-5 pb-1"
        >
          <Avatar src="" fallback="U" radius="full" />
          <Box maxWidth={"70%"}>
            <Text truncate size={"2"}>
              Nadine Schtakieff
            </Text>
            <Text truncate size={"1"} className="text-neutral-500">
              Frontend Developer
            </Text>
          </Box>
        </Flex>
      </div>
    </div>
  );
};

const ChatContainer = () => {
  const [selectedButton, setSelectedButton] = useState("");
  const [query, setQuery] = useState("");
  const [chats, setChats] = useState([]);
  const [error, setError] = useState(null);
  const chatBoxRef = useRef(null);
  const inputRef = useRef(null);

  const getChat = async () => {
    try {
      const newChat = { query, result: "", loading: true };
      setChats((prevChats) => [...prevChats, newChat]);
      setQuery("");

      const response = await fetch("https://apis.hiaido.com/ask-question", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "r367708@gmail.com",
          question: query,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      newChat.result = data.response;
      newChat.loading = false;

      setChats((prevChats) => [...prevChats.slice(0, -1), newChat]);
      setQuery("");
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to fetch data");
    }
  };

  const onKeyUp = (e) => {
    if (e.key === "Enter") {
      getChat();
    }
  };

  useEffect(() => {
    chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
  }, [chats]);

  return (
    <div className="chat-container relative flex flex-col w-full h-screen gap-5">
      <div className="chat-heading md:text-2xl p-4 pt-10 text-3xl">
        Welcome To HIAIDO Cloud Assistant.
      </div>
      <div
        className="chat-box w-full h-[600px] text-sm p-3 scrollbar-none flex flex-col gap-3 overflow-auto divide-y-[1px] divide-gray-700"
        ref={chatBoxRef}
      >
        {chats.map((chat, index) => (
          <div key={index} className="py-2 mb-5">
            <div className="user-chat !text-xl py-4 text-gray-200 md:text-base flex">
              <div className="bg-cyan-700 flex items-center justify-center w-10 h-10 mx-4 rounded-full">
                <div>U</div>
              </div>
              <p className="text-neutral-300 text-2xl">{chat.query}</p>
            </div>
            <div className="chat-boat-chat relative">
              {chat.loading ? (
                <div>
                  <div className="dot-typing mt-5 ml-5"></div>
                </div>
              ) : (
                <div className="flex">
                  <img
                    className="w-12 h-12 mx-3 my-4"
                    src={logo}
                    alt="bot avatar"
                  />
                  <ReactMarkdown
                    className="markdown"
                    components={{
                      code(props) {
                        const { children, className, node, ...rest } = props;
                        const match = /language-(\w+)/.exec(className || "");
                        return true ? (
                          <div className="w-full my-4 overflow-x-auto rounded-md">
                            <SyntaxHighlighter
                              style={gruvboxDark}
                              showLineNumbers
                              wrapLongLines
                              language={match[1]}
                            >
                              {children}
                            </SyntaxHighlighter>
                          </div>
                        ) : (
                          <code {...rest} className={className}>
                            {children}
                          </code>
                        );
                      },
                    }}
                  >
                    {chat.result}
                  </ReactMarkdown>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div
        className={`chat-query-box mb-5 w-full absolute bottom-0 rounded-lg p-[3px] transition-all duration-200 ease-in bg-gradient-to-tr animated-background ${
          selectedButton == "" ? "" : buttonProps[selectedButton].buttonGradient
        }`}
      >
        <div className=" bg-neutral-800 flex flex-col w-full gap-3 p-3 rounded-lg">
          <Flex gap="3">
            {buttons.map((button, i) => {
              return (
                <div
                  key={i}
                  className={`rounded-md inline ${
                    button === selectedButton ? "" : " "
                  }`}
                >
                  <Button
                    onClick={() => {
                      if (button == selectedButton) {
                        setSelectedButton("");
                        setQuery("");
                      } else {
                        setQuery(button + " ");
                        setSelectedButton(button);
                        inputRef.current.focus();
                      }
                    }}
                    className={`!p-[17px] !text-sm  inline ${
                      button == selectedButton
                        ? buttonProps[button].buttonGradient
                        : // : "!from-[#396afc] !to-[#2948ff]"
                          "!bg-cyan-100 !text-neutral-900"
                    }`}
                  >
                    <span
                      className={`text-[15px] ${
                        button === selectedButton
                          ? "text-neutral-100"
                          : "text-neutral-800"
                      } my-3`}
                    >
                      {button}
                    </span>
                  </Button>
                </div>
              );
            })}
          </Flex>
          <div className="query-input flex items-center gap-4">
            <input
              ref={inputRef}
              type="text"
              placeholder="Ask Any Question..."
              className="bg-neutral-700 outline-neutral-800 outline-1 focus:outline-neutral-800 w-full h-12 px-3 rounded-md"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyUp={onKeyUp}
            />
            <div className="duration-100 ease-in rounded-md">
              <Button
                className="!p-6 !bg-gradient-to-r !text-base !to-green-500 !via-blue-500 !from-blue-600 hover:!scale-105 !duration-200 ease-in"
                onClick={getChat}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const buttonProps = {
  Create: {
    gradient: "from-[#4158D0] via-[#C850C0] to-[#FFCC70]",
    buttonGradient: "!from-emerald-500 !to-emerald-900 !bg-gradient-to-tr",
  },
  Describe: {
    gradient: "from-[#0093E9] via-[#80D0C7] to-[#4FB7AA]",
    // buttonGradient: "!from-[#0093E9] !via-[#80D0C7] !to-[#4FB7AA] !bg-gradient-to-tr",
    buttonGradient: "bg-cyan-500",
  },
  Update: { gradient: "bg-cyan-500", buttonGradient: "bg-cyan-500" },
  List: { gradient: "bg-cyan-500", buttonGradient: "bg-cyan-500" },
  Delete: {
    gradient: "from-[#FFE53B] via-[#FF2525] to-[#ECA372]",
    buttonGradient: "!from-red-700 !to-orange-800 !bg-gradient-to-tr",
  },
};
const buttons = ["Create", "Describe", "Update", "List", "Delete"];
export default Chat;
