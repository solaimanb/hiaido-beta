import { memo, useContext, useEffect, useRef, useState } from "react";
import logo from "/hiaido-logo.png";
import { AnimatePresence, motion } from "framer-motion";
import { Tooltip } from "@radix-ui/themes";
import { ArrowPathIcon, PaperClipIcon } from "@heroicons/react/24/solid";
import { CopyIcon } from "@radix-ui/react-icons";
import toast from "react-hot-toast";
import { GlobalStateContext } from "../../context/GlobalStateContext";
import CreateMemberAccountButton from "../CreateMemberAccountButton";
import config from "../../config";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { signOut, fetchUserAttributes } from "@aws-amplify/auth";
import MDX from "../MDX";
import QueryTemplates from "./QueryTemplates";
import ChatResponseButtonsGroup from "./ChatResponseButtonsGroup";

const width = "840";
const widthClass = `w-[${width}px]`;

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
                    <MDX content={chat.result} />
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
  // const [chats, setChats] = useState([
  //   {
  //     query: "markdown test",
  //     result: markdownData,
  //   },
  // ]);
  const [error, setError] = useState(null);
  const [newChat, setNewChat] = useState(null);
  const chatBoxRef = useRef(null);
  const inputRef = useRef(null);
  const { user } = ctx;

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
          // TODO: may break during google sign in, fix it
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
    // debounce if previous response is still loading
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
                      inputRef={inputRef}
                      askQuery={(templateQuery) => getChat(templateQuery)}
                    />
                  )}
                </motion.div>
              )}
            </AnimatePresence>
            <ChatsList chats={chats} />
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center">
        <div
          className={`mb-4 mt-0 w-full rounded-lg flex justify-center bg-transparent`}
        >
          <QueryBox
            inputRef={inputRef}
            query={query}
            disabled={chats.length > 0 && chats.at(-1).loading}
            onKeyUp={onKeyUp}
            setQuery={setQuery}
          />
        </div>
      </div>
    </>
  );
};

const QueryBox = ({ query, onKeyUp, setQuery, disabled, submitPrompt }) => {
  const inputRef = useRef(null);
  useEffect(() => {
    if (inputRef.current) {
      console.log(inputRef.current.scrollHeight, inputRef.current.style.height);
      inputRef.current.style.height = `inherit`;
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
      inputRef.current.scrollBy(0, inputRef.current.scrollHeight);
    }
  }, [query]);

  const { memberAccounts } = useContext(GlobalStateContext);
  return (
    <div className="dark:bg-neutral-800 bg-neutral-300/45 shadow-md rounded-[26px] flex items-end gap-3.5 w-[840px] p-1.5 outline-none appearance-none">
      {/* <PaperClipIcon className="w-6 ml-3" /> */}
      <div className="flex flex-col flex-1 min-w-0 ml-4">
        <textarea
          disabled={memberAccounts && memberAccounts.length == 0}
          rows={1}
          className="bg-black/0 w-full max-h-52 px-2 py-2 resize-none focus:ring-0 border-none outline-none overflow-y-scroll text-black dark:text-neutral-100 placeholder-neutral-700 dark:placeholder-neutral-400"
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
        disabled={disabled}
        className="bg-neutral-100 hover:bg-neutral-200 mb-1 disabled:bg-neutral-500 disabled:cursor-not-allowed flex items-center justify-center w-8 h-8 mr-1 rounded-full"
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

const markdownData = `
# Heading Level 1

## Heading Level 2

### Heading Level 3

#### Heading Level 4

##### Heading Level 5

###### Heading Level 6

---

**Bold Text**

*Italic Text*

~~Strikethrough Text~~

**_Bold and Italic Text_**

> Blockquote

1. Ordered List Item 1
2. Ordered List Item 2
    - Nested Unordered Item 1
    - Nested Unordered Item 2

- Unordered List Item 1
- Unordered List Item 2
    1. Nested Ordered Item 1
    2. Nested Ordered Item 2

[Link to Google](https://www.google.com)

![Sample Image](https://via.placeholder.com/150 "Sample Image")

\`\`\`javascript
// Code Block with Syntax Highlighting
function greet(name) {
  console.log(\`Hello, \${name}!\`);
}
\`\`\`

\`Inline Code\`

| Table Header 1 | Table Header 2 |
| -------------- | -------------- |
| Row 1, Cell 1  | Row 1, Cell 2  |
| Row 2, Cell 1  | Row 2, Cell 2  |

---

### Task List

- [x] Task 1
- [ ] Task 2
- [ ] Task 3

---

### Emojis

Here are some emojis: 😃🎉🚀✨👍

---

### Horizontal Rule

---

### HTML Elements

<p>This is a paragraph rendered using HTML within Markdown.</p>

<details>
  <summary>Expandable Content</summary>
  <p>This content is hidden until expanded.</p>
</details>

---

### Footnotes

Here's a sentence with a footnote.[^1]

[^1]: This is the footnote.

---

### Subscript and Superscript

H~2~O (Subscript) and 10^2^ (Superscript)

---

### Escaping Characters

Use a backslash to escape characters: \\*literal asterisks\\*
`;
