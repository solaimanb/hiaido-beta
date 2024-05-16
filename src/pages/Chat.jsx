import { useState, useEffect, useRef } from "react";
// import ReactLoading from "react-loading";
// import Dashboard from "./ChatBot/Dashboard";
import Dashboard from "../components/ChatBot/Dashboard";
import { Flex, Button } from "@radix-ui/themes";
import ReactMarkdown from "react-markdown";
// import dotsLoaderGif from "/icons8-dots-loading.gif";
// import Button from "./Button";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { gruvboxDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import logo from "/hiaido-logo.png";

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
  const [selectedButton, setSelectedButton] = useState("");
  const [query, setQuery] = useState("");
  const [chats, setChats] = useState([]);
  const [error, setError] = useState(null);
  const chatBoxRef = useRef(null);
  const inputRef = useRef(null);

  console.log(selectedButton);

  useEffect(() => {
    chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
  }, [chats]);

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

  return (
    <div className="grid h-full grid-cols-3">
      <div className="pr-14 w-full col-span-2 px-4 pl-10">
        <div className="chat-container relative flex flex-col w-full h-screen gap-5">
          <div className="chat-heading md:text-2xl p-4 pt-10 text-3xl">
            Welcome To HIAIDO Cloud Assistant.
          </div>
          <div
            className="chat-box w-full h-[670px] p-3 scrollbar-none flex flex-col gap-3 overflow-auto divide-y-[1px] divide-gray-700"
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
                            const { children, className, ...rest } = props;
                            // const match = /language-(\w+)/.exec(
                            //   className || ""
                            // );
                            return true ? (
                              <div className="w-full my-4 overflow-x-auto rounded-md">
                                {/* <SyntaxHighlighter
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
                                /> */}
                                <SyntaxHighlighter
                                  // {...rest}
                                  // PreTag="div"
                                  // language="python"
                                  style={gruvboxDark}
                                  showLineNumbers
                                  wrapLongLines
                                  // wrapLines
                                >
                                  {children[0].slice(
                                    children[0].indexOf(" ") + 1
                                  )}
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
                  {/* <div className="absolute w-full h-0.5 bg-gray-300 bottom--4 left-0 opacity-10"></div> */}
                </div>
              </div>
            ))}
          </div>

          <div
            className={`chat-query-box mb-5 w-full absolute bottom-0 rounded-lg p-[3px] transition-all duration-200 ease-in bg-gradient-to-tr animated-background ${
              selectedButton == ""
                ? ""
                : buttonProps[selectedButton].buttonGradient
            }`}
          >
            <div className=" bg-neutral-800 flex flex-col w-full gap-4 p-4 rounded-lg">
              <Flex gap="3">
                {buttons.map((button, index) => {
                  return (
                    <div
                      key={index}
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
                        className={`!p-5 !text-sm  inline ${
                          button == selectedButton
                            ? buttonProps[button].buttonGradient
                            : // : "!from-[#396afc] !to-[#2948ff]"
                              "!bg-cyan-100 !text-neutral-900"
                        }`}
                      >
                        <span
                          className={`font-medium text-[16px] ${
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
              <div className="query-input flex items-center gap-5">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Ask Any Question..."
                  className="bg-neutral-700 outline-neutral-800 outline-8 focus:outline-neutral-800 w-full h-12 px-3 rounded-md"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyUp={onKeyUp}
                />
                <div className="duration-100 ease-in rounded-md">
                  <Button
                    className="!p-6 !bg-gradient-to-r !text-lg !to-green-500 !via-blue-500 !from-blue-600 hover:!bg-gradient-to-r hover:!from-green-500 hover:!via-blue-500 hover:!to-blue-600 !duration-200 ease-in"
                    onClick={getChat}
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-span-1">
        <Dashboard />
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
