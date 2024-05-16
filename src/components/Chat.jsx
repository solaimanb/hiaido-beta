import React, { useState, useEffect, useRef } from "react";
import ReactLoading from "react-loading";
import Dashboard from "./ChatBot/Dashboard";
import { Flex, Button } from "@radix-ui/themes";
import ReactMarkdown from "react-markdown";
import dotsLoaderGif from "/icons8-dots-loading.gif";
// import Button from "./Button";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import logo from "/hiaido-logo.png";
import {
  dark,
  gruvboxDark,
  darcula,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import logo from "/hiaido-logo.png";
import { DashboardIcon, GearIcon, RocketIcon } from "@radix-ui/react-icons";
import {
  ChatBubbleLeftRightIcon,
  Cog6ToothIcon,
  CurrencyDollarIcon,
  Squares2X2Icon,
  UserIcon,
} from "@heroicons/react/24/solid";

const sampleChat = [
  {
    query: "Deploy website to S3",
    result:
      "Make sure to replace www with the path to your local directory that contains your website's static files. \n1. The index.html inside that directory will be used as the entry point (index document) for your S3 website. \n\n2.After deploying this program with Pulumi, the websiteUrl output will provide you with the URL to access your static website.\nMake sure to replace www with the path to your local directory that contains your website's static files. The index.html inside that directory will be used as the entry point (index document) for your S3 website. After deploying this program with Pulumi, the websiteUrl output will provide you with the URL to access your static website. Make sure to replace www with the path to your local directory that contains your website's static files. The index.html inside that directory will be used as the entry point (index document) for your S3 website. After deploying this program with Pulumi, the websiteUrl output will provide you with the URL to access your static website. Make sure to replace www with the path to your local directory that contains your website's static files. The index.html inside that directory will be used as the entry point (index document) for your S3 website. After deploying this program with Pulumi, the websiteUrl output will provide you with the URL to access your static website. Make sure to replace www with the path to your local directory that contains your website's static files. The index.html inside that directory will be used as the entry point (index document) for your S3 website. After deploying this program with Pulumi, the websiteUrl output will provide you with the URL to access your static website.",
  },
  {
    query: "Deploy website to S3",
    result:
      "Make sure to replace www with the path to your local directory that contains your website's static files. The index.html inside that directory will be used as the entry point (index document) for your S3 website. After deploying this program with Pulumi, the websiteUrl output will provide you with the URL to access your static website. Make sure to replace www with the path to your local directory that contains your website's static files. The index.html inside that directory will be used as the entry point (index document) for your S3 website. After deploying this program with Pulumi, the websiteUrl output will provide you with the URL to access your static website. Make sure to replace www with the path to your local directory that contains your website's static files. The index.html inside that directory will be used as the entry point (index document) for your S3 website. After deploying this program with Pulumi, the websiteUrl output will provide you with the URL to access your static website. Make sure to replace www with the path to your local directory that contains your website's static files. The index.html inside that directory will be used as the entry point (index document) for your S3 website. After deploying this program with Pulumi, the websiteUrl output will provide you with the URL to access your static website. Make sure to replace www with the path to your local directory that contains your website's static files. The index.html inside that directory will be used as the entry point (index document) for your S3 website. After deploying this program with Pulumi, the websiteUrl output will provide you with the URL to access your static website.",
  },
  {
    query: "Deploy website to S3",
    result:
      "Make sure to replace www with the path to your local directory that contains your website's static files. The index.html inside that directory will be used as the entry point (index document) for your S3 website. After deploying this program with Pulumi, the websiteUrl output will provide you with the URL to access your static website. Make sure to replace www with the path to your local directory that contains your website's static files. The index.html inside that directory will be used as the entry point (index document) for your S3 website. After deploying this program with Pulumi, the websiteUrl output will provide you with the URL to access your static website. Make sure to replace www with the path to your local directory that contains your website's static files. The index.html inside that directory will be used as the entry point (index document) for your S3 website. After deploying this program with Pulumi, the websiteUrl output will provide you with the URL to access your static website. Make sure to replace www with the path to your local directory that contains your website's static files. The index.html inside that directory will be used as the entry point (index document) for your S3 website. After deploying this program with Pulumi, the websiteUrl output will provide you with the URL to access your static website. Make sure to replace www with the path to your local directory that contains your website's static files. The index.html inside that directory will be used as the entry point (index document) for your S3 website. After deploying this program with Pulumi, the websiteUrl output will provide you with the URL to access your static website.",
  },
  {
    query: "Deploy website to S3",
    result:
      "Make sure to replace www with the path to your local directory that contains your website's static files. The index.html inside that directory will be used as the entry point (index document) for your S3 website. After deploying this program with Pulumi, the websiteUrl output will provide you with the URL to access your static website. Make sure to replace www with the path to your local directory that contains your website's static files. The index.html inside that directory will be used as the entry point (index document) for your S3 website. After deploying this program with Pulumi, the websiteUrl output will provide you with the URL to access your static website. Make sure to replace www with the path to your local directory that contains your website's static files. The index.html inside that directory will be used as the entry point (index document) for your S3 website. After deploying this program with Pulumi, the websiteUrl output will provide you with the URL to access your static website. Make sure to replace www with the path to your local directory that contains your website's static files. The index.html inside that directory will be used as the entry point (index document) for your S3 website. After deploying this program with Pulumi, the websiteUrl output will provide you with the URL to access your static website. Make sure to replace www with the path to your local directory that contains your website's static files. The index.html inside that directory will be used as the entry point (index document) for your S3 website. After deploying this program with Pulumi, the websiteUrl output will provide you with the URL to access your static website.",
  },
  {
    query: "send sms notification using python boto3 adn sns",
    result:
      "Here are the steps to send SMS notifications using Python, Boto3 and Amazon SNS: \n1. Install boto3 library. \n\n ```python pip install boto3 ```\n\n 2. Import boto3 SDK and setup SNS client\n\n ```python import boto3 sns = boto3.client('sns') ```\n\n 3. Create a new SNS topic to send SMS messages\n\n ```python response = sns.create_topic(Name=\"my-sms-topic\") topic_arn = response[\"TopicArn\"] ```\n\n 4. Subscribe a phone number to the SNS topic \n\n```python sns.subscribe(TopicArn=topic_arn, Protocol=\"sms\", Endpoint=\"+1234567890\") ```\n\n 5. Publish a message to the SNS topic to send SMS\n\n ```python response = sns.publish( TopicArn=topic_arn, Message=\"Hello from SNS!\", MessageAttributes={ 'AWS.SNS.SMS.SenderID': { 'DataType': 'String', 'StringValue': 'MySenderID' } } ) ```\n\n Make sure to replace the phone number and specify a sender ID. This will send an SMS notification to the subscribed number. Let me know if you need any clarification or have additional questions!",
  },
];

const Chat = () => {
  return (
    <div className="grid grid-cols-8 h-full">
      <div className="col-span-1 p-3">
        <Navbar />
      </div>
      <div className="w-full col-span-4 px-4 pl-10 pr-14">
        <ChatContainer />
      </div>

      <div className="col-span-3">
        <Dashboard />
      </div>
    </div>
  );
};

const Navbar = () => {
  const [navTabIndex, setNavTabIndex] = useState();

  const navbarData = [
    {
      label: "Chatbot",
      icon: <ChatBubbleLeftRightIcon className="w-8 h-8 pr-3" />,
    },
    { label: "Profile", icon: <UserIcon className="w-8 h-8 pr-3" /> },
    { label: "Dashboard", icon: <Squares2X2Icon className="w-8 h-8 pr-3" /> },
    { label: "Pricing", icon: <CurrencyDollarIcon className="w-8 h-8 pr-3" /> },
    { label: "Settings", icon: <Cog6ToothIcon className="w-8 h-8 pr-3" /> },
  ];

  return (
    <div className="w-full rounded-lg bg-neutral-800 h-full p-5">
      <div className="text-2xl mb-10 flex items-center">
        <img className="w-8 h-8 mr-2" src={logo} alt="Brand Logo" />
        <h1>HiAiDo</h1>
      </div>
      <div className="my-10 space-y-2 pl-1 text-neutral-400">
        {navbarData.map((item, i) => {
          return (
            <button
              onClick={() => setNavTabIndex(i)}
              className={`rounded-lg flex items-center text-base outline-none w-full p-2 px-3 ${
                i == navTabIndex ? "bg-neutral-600 text-white" : "hover:bg-neutral-700 duration-300 hover:text-neutral-300"
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          );
        })}
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
  console.log(selectedButton);

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
    <div className="chat-container w-full flex flex-col gap-5 relative h-screen">
      <div className="chat-heading text-3xl p-4 pt-10 md:text-2xl">
        Welcome To HIAIDO Cloud Assistant.
      </div>
      <div
        className="chat-box w-full h-[670px] p-3 scrollbar-none flex flex-col gap-3 overflow-auto divide-y-[1px] divide-gray-700"
        ref={chatBoxRef}
      >
        {chats.map((chat, index) => (
          <div key={index} className="py-2 mb-5">
            <div className="user-chat !text-xl py-4 text-gray-200 md:text-base flex">
              <div className="bg-cyan-700 rounded-full w-10 h-10 mx-4 flex justify-center items-center">
                <div>U</div>
              </div>
              <p className="text-2xl text-neutral-300">{chat.query}</p>
            </div>
            <div className="chat-boat-chat relative">
              {chat.loading ? (
                <div>
                  <div className="dot-typing ml-5 mt-5"></div>
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
                          <div className="my-4 rounded-md overflow-x-auto w-full">
                            <SyntaxHighlighter
                              // {...rest}
                              // PreTag="div"
                              children={children[0].slice(
                                children[0].indexOf(" ") + 1
                              )}
                              // language="python"
                              style={gruvboxDark}
                              showLineNumbers
                              wrapLongLines
                              // wrapLines
                            />
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
              {/* <div className="absolute w-full h-0.5 bg-gray-300 bottom--4 left-0 opacity-10"></div> */}
            </div>
          </div>
        ))}
      </div>

      <div
        className={`chat-query-box mb-5 w-full absolute bottom-0 rounded-lg p-[3px] transition-all duration-200 ease-in bg-gradient-to-tr animated-background ${
          selectedButton == "" ? "" : buttonProps[selectedButton].buttonGradient
        }`}
      >
        <div className=" w-full bg-neutral-800 rounded-lg p-3 flex flex-col gap-3">
          <Flex gap="3">
            {buttons.map((button) => {
              return (
                <div
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
          <div className="query-input flex gap-4 items-center">
            <input
              ref={inputRef}
              type="text"
              placeholder="Ask Any Question..."
              className="w-full h-12 rounded-md px-3 bg-neutral-700 outline-neutral-800 outline-1 focus:outline-neutral-800"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyUp={onKeyUp}
            />
            <div className="ease-in duration-100 rounded-md">
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
