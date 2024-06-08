import { memo, useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { gruvboxDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import logo from "/hiaido-logo.png";
import Codeblock from "./Codeblock";
import { AnimatePresence, motion } from "framer-motion";
import { Avatar } from "@radix-ui/themes";

const QueryTemplates = ({ askQuery }) => {
  const data = [
    "How to create an S3 bucket?",
    "How to monitor a Lambda function?",
    "How to create an ETL pipeline using AWS Glue?",
    "How to setup a Elastic Load Balancer for EC2?",
  ];

  return (
    <div className="relative h-full">
      <div className="bottom-32 absolute flex justify-center w-full space-x-4">
        {data.map((item, i) => {
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

const ChatsList = memo(({ chats }) => {
  return (
    <>
      {chats.map((chat, index) => (
        <div key={index} className="py-2 mb-5">
          <div className="user-chat !text-xl py-4 text-gray-200 md:text-base flex">
            <div className="flex items-center justify-center w-10 h-10 mx-4">
              <Avatar fallback="U" radius="full" size={"4"} color="cyan" />
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
                      const match = /language-(\w+)/.exec(className || "");

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
    </>
  );
});

ChatsList.displayName = "ChatsList";

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
      console.log(templateQuery, query.trim());
      const newChat = {
        query: templateQuery || query.trim(),
        result: "",
        loading: true,
      };
      console.log(newChat);
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

      setChats((prevChats) => [...prevChats.slice(0, -1), newChat]);
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
      <div className="chat-heading md:text-2xl p-4 pt-6 text-3xl">
        Welcome To HIAIDO Cloud Assistant.
      </div>
      <div className="flex flex-col flex-1">
        <div
          className="chat-box grow w-full h-[680px] text-sm p-3 scrollbar-none flex flex-col gap-3 overflow-auto divide-y-[1px] divide-gray-700"
          ref={chatBoxRef}
        >
          <AnimatePresence>
            {chats.length == 0 && (
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
            )}
          </AnimatePresence>
          <AnimatePresence>
            {chats.length > 0 && (
              <motion.div
                transition={{ duration: 0.5 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full"
              >
                <ChatsList chats={chats} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div
          className={`chat-query-box mb-4 mt-2 w-full rounded-lg p-[3px] flex justify-center transition-all duration-200 ease-in bg-gradient-to-tr animated-background ${
            selectedButton == ""
              ? ""
              : buttonProps[selectedButton].buttonGradient
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
            <div className="flex flex-col flex-1 min-w-0 ml-4">
              <textarea
                rows={1}
                className="h-[40px] bg-black/0 w-full max-h-52 px-2 py-2 resize-none focus:ring-0 border-none outline-none overflow-y-hidden"
                ref={inputRef}
                onChange={(e) => setQuery(e.target.value)}
                name="query"
                id="query-box"
                value={query}
                placeholder="Ask anything..."
                onKeyUp={onKeyUp}
                onKeyDown={(k) => {
                  if (k.key == "Enter") k.preventDefault();
                }}
              ></textarea>
            </div>
            <button
              onClick={() => getChat()}
              disabled={chats.length > 0 && chats.at(-1).loading}
              className="bg-neutral-100 hover:bg-neutral-200 disabled:bg-neutral-500 disabled:cursor-not-allowed flex items-center justify-center w-8 h-8 mr-1 rounded-full"
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

export default ChatContainer;
