import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Flex, Button } from "@radix-ui/themes";
import { gruvboxDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import logo from "/hiaido-logo.png";
import Codeblock from "./Codeblock";
import { AnimatePresence, animate, motion } from "framer-motion";
import { PaperClipIcon } from "@heroicons/react/24/solid";
import { PlayIcon } from "@radix-ui/react-icons";

const QueryTemplates = ({ askQuery }) => {
  const data = [
    "How to create an S3 bucket?",
    "How to monitor a Lambda function?",
    "How to create an ETL pipeline using AWS Glue?",
    "How to setup a Elastic Load Balancer for EC2?",
  ];

  return (
    <div className="relative h-full">
      <div className="absolute bottom-32 flex w-full justify-center space-x-4">
        {data.map((item, i) => {
          console.log(item);
          return (
            <AnimatePresence key={i}>
              <motion.button
                onClick={() => askQuery(item)}
                key={item}
                className="p-4 w-40 rounded-2xl drop-shadow-md bg-neutral-800/50 border-[1px] flex justify-start border-neutral-700 text-neutral-100 text-left hover:bg-neutral-700/75 hover:border-neutral-500 duration-300"
              >
                <span>{item}</span>
              </motion.button>
            </AnimatePresence>
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

  const getChat = async (templateQuery) => {
    if (chats.length > 0 && chats.at(-1).loading) return;
    try {
      console.log(templateQuery, query);
      const newChat = {
        query: templateQuery || query,
        result: "",
        loading: true,
      };
      if (newChat.query == "") return;
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
            query: newChat.query,
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
      // setQuery("");
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
        <AnimatePresence>
          {chats.length == 0 ? (
            <motion.div
              transition={{ duration: 0.5 }}
              initial={{ scale: 0.8, opacity: 0, y: "-10px" }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              className="h-full"
            >
              <QueryTemplates
                askQuery={(templateQuery) => getChat(templateQuery)}
              />
            </motion.div>
          ) : (
            <motion.div
              transition={{ duration: 2 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-full"
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
                              const { children, className, node, ...rest } =
                                props;
                              // console.log(children, className);
                              const match = /language-(\w+)/.exec(
                                className || ""
                              );
                              // console.log(match);
                              // console.log(children[0])

                              return match ? (
                                <Codeblock
                                  language={match[1]}
                                  code={children[0].trim()}
                                  theme={gruvboxDark}
                                />
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
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div
        className={`chat-query-box mb-5 w-full absolute bottom-0 rounded-lg p-[3px] flex justify-center transition-all duration-200 ease-in bg-gradient-to-tr animated-background ${
          selectedButton == "" ? "" : buttonProps[selectedButton].buttonGradient
        }`}
      >
        {/* <div className=" bg-neutral-800 flex flex-col w-full gap-3 p-3 rounded-lg">
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
                disabled={chats.length > 0 && chats.at(-1).loading}
              >
                Submit
              </Button>
            </div>
          </div>
        </div> */}
        <div className="bg-neutral-800 rounded-[26px] flex items-center gap-3.5 w-2/3 p-1.5 outline-none appearance-none">
          {/* <PaperClipIcon className="w-6 ml-3" opacity={0} /> */}
          <div className="flex min-w-0 flex-1 flex-col ml-4">
            <textarea
              rows={1}
              className="h-[40px] bg-black/0 w-full max-h-52 px-2 py-2 resize-none focus:ring-0 border-none outline-none overflow-y-hidden"
              ref={inputRef}
              onChange={(e) => setQuery(e.target.value)}
              name="query"
              id="query-box"
              value={query}
              placeholder="Ask anything..."
            ></textarea>
          </div>
          <button
            onClick={() => getChat()}
            disabled={chats.length > 0 && chats.at(-1).loading}
            className="bg-neutral-100 w-8 h-8 rounded-full flex items-center justify-center mr-1 hover:bg-neutral-200 disabled:bg-neutral-500 disabled:cursor-not-allowed"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#111111"
              className="size-5"
            >
              <path
                fillRule="evenodd"
                d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

const buttons = ["Create", "Describe", "Update", "List", "Delete"];
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

export default ChatContainer;
