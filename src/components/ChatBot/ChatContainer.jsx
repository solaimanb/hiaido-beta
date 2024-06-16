import { memo, useContext, useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import {
  gruvboxDark,
  materialLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import logo from "/hiaido-logo.png";
import Codeblock from "./Codeblock";
import { AnimatePresence, motion } from "framer-motion";
import { Dialog, Tooltip, AlertDialog } from "@radix-ui/themes";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import { CopyIcon } from "@radix-ui/react-icons";
import toast from "react-hot-toast";
import { ThemeContext } from "../../context/ThemeContext";
import { GlobalStateContext } from "../../context/GlobalStateContext";
import CreateMemberAccountButton from "../CreateMemberAccountButton";
import config from "../../config";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { signOut, fetchUserAttributes } from "@aws-amplify/auth";

const copyContent = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  } catch (err) {
    console.log(err);
    alert("Failed to copy", err);
  }
};

const width = "840";
const widthClass = `w-[${width}px]`;

const MDX = ({ children }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <ReactMarkdown
      className="markdown leading-relaxed text-[15px]"
      components={{
        code(props) {
          const { children, className, node, ...rest } = props;
          const match = /language-(\w+)/.exec(className || "");

          return match ? (
            <Codeblock
              language={match[1]}
              code={children[0].trim()}
              // theme={theme === "dark" ? gruvboxDark : materialLight}
              theme={gruvboxDark}
            />
          ) : (
            <code
              {...rest}
              className={`${className} dark:text-yellow-200/50 text-yellow-800 dark:bg-neutral-900 bg-neutral-200 text-[13px] rounded-md p-[2px] px-1 font-mono`}
            >
              {children}
            </code>
          );
        },
        // h1: ({ className, children, ...rest }) => (
        //   <h1 className={`mt-10`}>{children}</h1>
        // ),
        // h2: ({ className, children, ...rest }) => (
        //   <h2 className={`${className} mt-10`} {...rest}>
        //     {children}
        //   </h2>
        // ),
        // h3: ({ className, children, ...rest }) => (
        //   <h3 className={`${className} !mt-10`}>{children}</h3>
        // ),
        // h4: ({ className, children, ...rest }) => (
        //   <h4 className={`${className} mt-10`} {...rest}>
        //     {children}
        //   </h4>
        // ),
        // h5: ({ className, children, ...rest }) => (
        //   <h5 className={`${className} mt-10`} {...rest}>
        //     {children}
        //   </h5>
        // ),
        // h6: ({ className, children, ...rest }) => (
        //   <h6 className={`${className} mt-10`} {...rest}>
        //     {children}
        //   </h6>
        // ),
      }}
    >
      {children}
    </ReactMarkdown>
  );
};

const QueryTemplates = ({ askQuery }) => {
  const data = [
    "How to create an S3 bucket?",
    "How to create an ETL pipeline using AWS Glue?",
    "How to monitor a Lambda function?",
    "How to setup a Elastic Load Balancer for EC2?",
  ];

  return (
    <div className="relative h-full">
      <div className="absolute bottom-72 flex w-full justify-center space-x-4">
        {data.map((item, i) => {
          return (
            <AnimatePresence key={i}>
              <motion.button
                onClick={() => askQuery(item)}
                key={item}
                className="p-4 w-40 rounded-2xl shadow-md dark:shadow-neutral-950 dark:bg-neutral-700/50 border-[1px] flex justify-start border-neutral-200 dark:border-neutral-700 text-neutral-800 dark:text-neutral-100 text-left dark:hover:bg-neutral-700/75 hover:bg-neutral-200/60 hover:border-neutral-300 dark:hover:border-neutral-500 duration-300"
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

const ChatResponseButtonsGroup = ({ content }) => {
  return (
    <div className="my-2 flex space-x-3">
      <Tooltip content="Regenerate">
        <button className="hover:stroke-neutral-600 stroke-neutral-500 outline-none">
          <ArrowPathIcon className="size-[18px]" />
        </button>
      </Tooltip>
      <Tooltip content="Copy response">
        <button
          onClick={() => {
            copyContent(content);
          }}
          className="hover:stroke-neutral-600 stroke-neutral-500 outline-none"
        >
          <CopyIcon className="size-[18px]" strokeWidth={0.5} />
        </button>
      </Tooltip>
    </div>
  );
};

const CreateMemberAccountWarningBox = () => {
  return (
    <div className="absolute top-32 flex justify-center w-full text-lg text-neutral-700">
      <div className="w-[600px] text-center bg-red-400/35 border-red-500 dark:bg-red-800/30 dark:border-red-900 border-[1px] rounded-xl p-3 py-5">
        <h1 className="text-black dark:text-neutral-50 text-3xl">
          No member account found
        </h1>
        <p className="mb-12 mt-5 mx-3 dark:text-neutral-400">
          You need to create a member account first before using the chatbot
        </p>
        <CreateMemberAccountButton />
      </div>
      <div></div>
    </div>
  );
};

const ChatsList = memo(({ chats }) => {
  return (
    <>
      {chats.map((chat, index) => (
        <div key={index} className="w-full">
          <div className="py-2 px-3 text-base">
            <div className={`flex flex-1 mx-auto gap-3 ${widthClass}`}>
              {/* <div className="flex flex-shrink-0 items-start">
                <Avatar fallback="U" radius="full" size={"3"} color="cyan" />
              </div> */}
              <p className="dark:text-neutral-300 text-white text-[15px] font-[500] ml-5 dark:bg-neutral-700/50 bg-neutral-800 p-2 rounded-[20px] px-5 dark:shadow-neutral-900 shadow-md max-w-[75%] mt-8">
                {chat.query}
              </p>
            </div>
          </div>
          <div className="relative py-2">
            {chat.loading ? (
              // <div className={`mx-auto pl-7 ${widthClass}`}>
              //   <div className={`dot-typing mt-5 ml-5`}></div>
              // </div>
              <div class={`mx-auto w-[720px] mt-3`}>
                <div class="animate-pulse flex space-x-4">
                  <div class="flex-1 space-y-4">
                    <div class="h-4 dark:bg-neutral-700/60 bg-neutral-300 rounded"></div>
                    <div class="grid grid-cols-3 gap-4">
                      <div class="h-4 dark:bg-neutral-700/60 bg-neutral-300 rounded col-span-2"></div>
                      <div class="h-4 dark:bg-neutral-700/60 bg-neutral-300 rounded col-span-1"></div>
                    </div>
                    <div class="h-4 dark:bg-neutral-700/60 bg-neutral-300 rounded"></div>
                    <div class="grid grid-cols-3 gap-4">
                      <div class="h-4 dark:bg-neutral-700/60 bg-neutral-300 rounded col-span-1"></div>
                      <div class="h-4 dark:bg-neutral-700/60 bg-neutral-300 rounded col-span-2"></div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className={`flex flex-1 mx-auto gap-4 ${widthClass}`}>
                <img
                  className="my-4 size-8 flex-shrink-0"
                  src={logo}
                  alt="bot avatar"
                />
                <AnimatePresence>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                  >
                    <MDX>{chat.result}</MDX>
                    {index == chats.length - 1 && (
                      <ChatResponseButtonsGroup content={chat.result} />
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      ))}
    </>
  );
});

// contains the chats and query box
const ChatContainer = () => {
  console.log("ChatContainer");
  const { memberAccounts, currentMemberAccount } =
    useContext(GlobalStateContext);
  const ctx = useAuthenticator();
  const [query, setQuery] = useState("");
  const [chats, setChats] = useState([]);
  const [error, setError] = useState(null);
  const [newChat, setNewChat] = useState(null);
  const chatBoxRef = useRef(null);
  const inputRef = useRef(null);
  console.log(ctx);
  // console.log(currentMemberAccount["email"]);
  useEffect(() => {
    fetchUserAttributes().then((res) => console.log(res));
  }, []);

  useEffect(() => {
    const fetchResponse = async () => {
      console.log(newChat);
      const response = await fetch(`${config.baseURL}/get-response`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: currentMemberAccount["email"],
          owner: user.signInDetails.loginId,
          query: newChat.query,
        }),
      });
      console.log("Completed request");
      const response_data = await response.json();
      console.log(response_data);
      if (!response.ok) {
        if (
          response.status == 400 &&
          response_data["detail"].includes("CLI not configured")
        ) {
          const res = await fetch(`${config.baseURL}/configure-cli`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: currentMemberAccount["email"],
              owner: user.signInDetails.loginId,
            }),
          });
          const res_data = await res.json();
          console.log(res_data);
          if (res.ok) {
            await fetchResponse();
            return;
          } else {
            setError(res_data);
          }
        } else {
          throw new Error(res_data);
        }
      }

      newChat.result = response_data.response;
      newChat.loading = false;

      setChats((prevChats) => [...prevChats.slice(0, -1), newChat]);
    };

    if (newChat) {
      fetchResponse();
    }
  }, [newChat]);

  const getChat = async (templateQuery) => {
    // previous response is still loading
    if (chats.length > 0 && chats.at(-1).loading) return;

    try {
      console.log(templateQuery, query.trim());
      // if template query is null then maybe user has typed the query
      const queryToUse = templateQuery || query.trim();
      if (queryToUse == "") return;

      const chat = {
        query: queryToUse,
        result: "",
        loading: true,
      };
      setChats((prevChats) => [...prevChats, chat]);
      setQuery("");
      setNewChat(chat);
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to fetch data");
    }
  };

  const onKeyUp = (e) => {
    if (e.key === "Enter" && e.shiftKey) {
      setQuery((prev) => prev.slice().concat("\n"));
    } else if (e.key === "Enter") {
      getChat();
    }
  };

  useEffect(() => {
    chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
  }, [chats]);

  return (
    <>
      {/* <div className="overflow-hidden h-full w-full"> */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto w-full">
          <div className="flex flex-col text-sm pb-48 " ref={chatBoxRef}>
            <div className="md:text-2xl p-4 pt-6 text-3xl text-center sticky top-0 pb-4 mb-5 font-semibold text-black dark:text-neutral-300 dark:bg-[#1a1a1a] bg-neutral-50  z-10">
              Welcome To HIAIDO Cloud Assistant.
            </div>
            <AnimatePresence>
              {chats.length == 0 && (
                <motion.div
                  transition={{ duration: 0.2 }}
                  initial={{ scale: 0.95, opacity: 0, y: "-5px" }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  className="h-[800px]"
                >
                  {memberAccounts && memberAccounts.length == 0 ? (
                    <CreateMemberAccountWarningBox />
                  ) : (
                    <QueryTemplates
                      askQuery={(templateQuery) => getChat(templateQuery)}
                    />
                  )}
                </motion.div>
              )}
            </AnimatePresence>
            {/* <AnimatePresence>
              {chats.length > 0 && (
                <motion.div
                  transition={{ duration: 0.5 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-full"
                >
                </motion.div>
              )}
            </AnimatePresence> */}
            <ChatsList chats={chats} />
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center">
        <div
          className={`mb-4 mt-2 w-full rounded-lg p-[3px] flex justify-center transition-all duration-200 ease-in bg-gradient-to-tr animated-background`}
        >
          <div className="dark:bg-neutral-800 bg-neutral-300/45 shadow-md rounded-[26px] flex items-center gap-3.5 w-[840px] p-1.5 outline-none appearance-none">
            {/* <PaperClipIcon className="w-6 ml-3" opacity={0} /> */}
            <div className="flex flex-col flex-1 min-w-0 ml-4">
              <textarea
                disabled={memberAccounts && memberAccounts.length == 0}
                rows={1}
                className="h-[40px] bg-black/0 w-full max-h-52 px-2 py-2 resize-none focus:ring-0 border-none outline-none overflow-y-hidden text-black dark:text-neutral-100 placeholder-neutral-700 dark:placeholder-neutral-400"
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
      {/* </div> */}
    </>
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
