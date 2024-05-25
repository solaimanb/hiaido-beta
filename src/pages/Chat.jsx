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
import { CopyIcon } from "@radix-ui/react-icons";
import toast from "react-hot-toast";

const sampleChat = [
  {
    query: "Create lambda function using boto3",
    result: `To create a Lambda function using the AWS CLI, we need to gather some required and optional fields. Here are the details:

### Required Fields:
1. **Function Name**: The name you want to assign to the Lambda function.
2. **Runtime**: The runtime environment for the Lambda function (e.g., \`python3.8\`, \`nodejs14.x\`).
3. **Role**: The ARN of the IAM role that Lambda assumes when it executes your function.
4. **Handler**: The function within your code that Lambda calls to begin execution (e.g., \`lambda_function.lambda_handler\`).
5. **Zip File**: The path to the deployment package (a .zip file) that contains your Lambda function code.

### Optional Fields:
1. **Description**: A description of the function.
2. **Timeout**: The amount of time that Lambda allows a function to run before stopping it (default is 3 seconds).
3. **Memory Size**: The amount of memory available to the function at runtime (default is 128 MB).
4. **Environment Variables**: Key-value pairs that Lambda sets in the execution environment.

### Steps:
1. **Specify the required fields.**
2. **Specify any optional fields if needed.**
3. **Confirm to proceed with the creation.**

Let's start by gathering the required information.

#### Required Fields:
1. **Function Name**: What would you like to name your Lambda function?
2. **Runtime**: Which runtime environment would you like to use (e.g., \`python3.8\`, \`nodejs14.x\`)?
3. **Role ARN**: Do you have the ARN of the IAM role that Lambda will assume?
4. **Handler**: What is the handler for your Lambda function (e.g., \`lambda_function.lambda_handler\`)?
5. **Zip File Path**: Where is the deployment package located?

#### Optional Fields:
1. **Description**: Would you like to add a description for the function?
2. **Timeout**: Do you want to set a custom timeout (default is 3 seconds)?
3. **Memory Size**: Do you want to set a custom memory size (default is 128 MB)?
4. **Environment Variables**: Do you have any environment variables to set?

Please provide the required information, and specify any optional fields if needed.`,
  },
  {
    query: "Write python code to upload a docker container",
    result: `To upload a Docker container to a repository, you typically need to follow these steps:
1. Build the Docker image.
2. Tag the Docker image.
3. Push the Docker image to a Docker registry (e.g., Docker Hub, Amazon ECR).
    
    Below is a Python script that uses the Docker SDK for Python to automate these steps. This example assumes you are pushing the Docker image to Docker Hub.
    
    First, you need to install the Docker SDK for Python:
    \`\`\`sh
    pip install docker
    \`\`\`
    
    Here is the Python code:
    
    \`\`\`python
    import docker
    import os
    
    # Initialize the Docker client
    client = docker.from_env()
    
    # Define variables
    dockerfile_path = './Dockerfile'  # Path to your Dockerfile
    image_name = 'your_image_name'    # Name of the Docker image
    tag = 'latest'                    # Tag for the Docker image
    repository = 'your_dockerhub_username/your_repository_name'  # Docker Hub repository

    # Build the Docker image
    print("Building Docker image...")
    image, build_logs = client.images.build(path='.', dockerfile=dockerfile_path, tag=f'{image_name}:{tag}')
    for log in build_logs:
        print(log)
    
    # Tag the Docker image
    print("Tagging Docker image...")
    image.tag(repository, tag=tag)
    
    # Log in to Docker Hub
    print("Logging in to Docker Hub...")
    dockerhub_username = os.getenv('DOCKERHUB_USERNAME')
    dockerhub_password = os.getenv('DOCKERHUB_PASSWORD')
    client.login(username=dockerhub_username, password=dockerhub_password)
    
    # Push the Docker image to Docker Hub
    print("Pushing Docker image to Docker Hub...")
    push_logs = client.images.push(repository, tag=tag, stream=True, decode=True)
    for log in push_logs:
        print(log)
    
    print("Docker image uploaded successfully.")
    \`\`\`
    
    ### Explanation:
    1. **Initialize the Docker client**: Connects to the Docker daemon.
    2. **Define variables**: Set the path to your Dockerfile, the image name, tag, and repository.
    3. **Build the Docker image**: Uses the Dockerfile to build the image.
    4. **Tag the Docker image**: Tags the image with the repository and tag.
    5. **Log in to Docker Hub**: Authenticates with Docker Hub using environment variables for security.
    6. **Push the Docker image**: Pushes the tagged image to the specified Docker Hub repository.
    
    ### Prerequisites:
    - Ensure Docker is installed and running on your machine.
    - Replace \`your_image_name\`, \`your_dockerhub_username\`, and \`your_repository_name\` with your actual Docker image name, Docker Hub username, and repository name.
    - Set the \`DOCKERHUB_USERNAME\` and \`DOCKERHUB_PASSWORD\` environment variables with your Docker Hub credentials.
    
    You can set the environment variables in your terminal like this:
    \`\`\`sh
    export DOCKERHUB_USERNAME='your_dockerhub_username'
    export DOCKERHUB_PASSWORD='your_dockerhub_password'
    \`\`\`
    
    This script will automate the process of building, tagging, and pushing a Docker image to Docker Hub.
    `,
  },
];

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
  const [isCollapsed, setIsCollapsed] = useState(true);

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
    <div
      className={`bg-neutral-800 relative h-full rounded-lg text-[13px] flex flex-col ${
        isCollapsed ? "w-[48px] p-1 py-3 justify-center" : "w-[210px] p-3"
      }`}
    >
      <div className={`flex items-center my-4 text-2xl ${isCollapsed && "justify-center"}`}>
        <img
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`w-8 h-8 ${isCollapsed || "mr-2"}`}
          src={logo}
          alt="Brand Logo"
        />
        {isCollapsed || <h1>HiAiDo</h1>}
      </div>
      <div className="divide-neutral-600 h-full">
        <div className="text-neutral-400 my-2 space-y-1">
          <div className="text-neutral-500 my-2 h-3 text-xs font-semibold">
            {isCollapsed || "MAIN"}
          </div>
          {navbarData.slice(0, sliceIndex).map((item, i) => {
            return (
              <button
                key={item.id || i}
                onClick={() => setNavTabIndex(i)}
                className={`rounded-lg flex items-center justify-center outline-none p-[1px] px-2 ${
                  i == navTabIndex
                    ? "bg-neutral-600 text-white"
                    : "hover:bg-neutral-700 duration-300 hover:text-neutral-300"
                }`}
              >
                {item.icon}
                {isCollapsed || <span className="text-left">{item.label}</span>}
              </button>
            );
          })}
        </div>
        <div className="h-[1px] bg-neutral-700/75 my-2"></div>
        <div className="text-neutral-400 mt-3 h-full space-y-1">
          <div className="text-neutral-500 my-2 h-3 text-xs font-semibold">
            {isCollapsed || "SUPPORT"}
          </div>
          {navbarData.slice(sliceIndex).map((item, i) => {
            return (
              <button
                key={item.id || i}
                onClick={() => setNavTabIndex(i + 5)}
                className={`rounded-lg flex items-center justify-center outline-none p-[1px] px-2 ${
                  i + 5 == navTabIndex
                    ? "bg-neutral-600 text-white"
                    : "hover:bg-neutral-700 duration-300 hover:text-neutral-300"
                }`}
              >
                {item.icon}
                {isCollapsed || <span className="text-left">{item.label}</span>}
              </button>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col h-fit items-center justify-end mx-3 space-y-2">
        {isCollapsed ? (
          <div className="">{data[parseInt(activeTabIndex)].icon}</div>
        ) : (
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
        )}

        <div className="h-[1px] bg-neutral-600"></div>
        <Flex
          gap="2"
          align="center"
          className="!border-t-[1px] !border-neutral-600 pt-5 pb-1"
        >
          <Avatar src="" fallback="U" radius="full" />
          {isCollapsed || (
            <Box maxWidth={"70%"}>
              <Text truncate size={"2"}>
                Nadine Schtakieff
              </Text>
              <Text truncate size={"1"} className="text-neutral-500">
                Frontend Developer
              </Text>
            </Box>
          )}
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

      const response = await fetch(
        `https://i7isuomfpxsfxsf5jlbdv5as6u0kcayx.lambda-url.us-east-1.on.aws/get-response`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: "r367708@gmail.com",
            query,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      newChat.result = data.response;
      newChat.loading = false;
      console.log(data.response);

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
        className="chat-box w-full h-[680px] text-sm p-3 scrollbar-none flex flex-col gap-3 overflow-auto divide-y-[1px] divide-gray-700"
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
                        // console.log(children, className);
                        const match = /language-(\w+)/.exec(className || "");
                        // console.log(match);
                        // console.log(children[0])
                        let pretag = ({ children, className, ...rest }) => {
                          return (
                            <pre
                              {...rest}
                              className={`${className} rounded-b-md bg-red-50 !my-0`}
                            >
                              {children}
                            </pre>
                          );
                        };
                        const copyContent = async (text) => {
                          try {
                            await navigator.clipboard.writeText(text);
                            toast.success("Copied to clipboard");
                          } catch (err) {
                            alert("Failed to copy", err);
                          }
                        };
                        return match ? (
                          <div
                            className="w-full my-4 overflow-x-auto rounded-lg p-0 drop-shadow-lg"
                            style={{ fontFamily: "monospace" }}
                          >
                            <div className="flex bg-neutral-900 rounded-t-md justify-between w-full items-center p-2 px-4">
                              <div className="">{match[1]}</div>
                              <div className="">
                                <CopyIcon
                                  className="cursor-pointer"
                                  onClick={async () => {
                                    await copyContent(children[0]);
                                  }}
                                />
                              </div>
                            </div>
                            <SyntaxHighlighter
                              lineNumberStyle={{ fontFamily: "monospace" }}
                              style={gruvboxDark}
                              // codeTagProps={{
                              //   style: { fontFamily: "inherit" },
                              // }}
                              showLineNumbers
                              wrapLongLines
                              PreTag={pretag}
                              language={match[1]}
                            >
                              {children[0].trim()}
                            </SyntaxHighlighter>
                          </div>
                        ) : (
                          <code
                            {...rest}
                            className={`${className} text-yellow-200/50 bg-neutral-900 rounded-md p-[2px] px-1 font-mono`}
                          >
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
                        : "!bg-cyan-100 !text-neutral-900"
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
