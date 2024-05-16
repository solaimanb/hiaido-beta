import { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { useStore } from "../../store/Store";
import ButtonsComp from "./ButtonsComp";
import UserMessage from "./UserMessage";
import BotMessage from "./BotMessage";
import { topics, colorVariants, borderVariants } from "../../constants";
import Inputs from "./Inputs";

const ChatBotComponent = () => {
  const [messages, setMessages] = useState([]);
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  console.log(showPlaceholder)
  const [inputText, setInputText] = useState("");
  const [topic, setTopic] = useState(topics[0]);
  const { user } = useStore()
  // const [currentverionBtn, setCurrentVersionBtn] = useState(gptVersions[1]?.id);
  // const [currentModeBtn, setCurrentModeBtn] = useState(modes[0]?.id);
  const [isBot, setIsBot] = useState(true);
  const sendMessage = () => {
    if (inputText.trim() === "") return;
    if (inputText.toLocaleLowerCase() === "give me html") {
      setMessages([...messages, { text: Inputs, isUser: false, isHTML: true }])
    } else {
      const newMessage = { topic: topic?.title, text: inputText, isUser: isBot, isHTML: false };
      setMessages([...messages, newMessage]);
    }
    setInputText("");
  };
  useEffect(() => {
    setMessages([...messages, { text: ButtonsComp, isUser: false, isHTML: true }])
  }, [])

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages.length]);


  // Typing Placeholder
  const placeholders = ['Type something...something...something...', 'Try something new...something...', 'Explore...something...something...something...something...something...something...'];
  const [currentPlaceholderIndex, setCurrentPlaceholderIndex] = useState(0);
  const [typedText, setTypedText] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPlaceholderIndex((prevIndex) =>
        prevIndex === placeholders.length - 1 ? 0 : prevIndex + 1
      );
      setTypedText(''); // Reset typed text when placeholder changes
    }, 2000);

    return () => clearInterval(interval);
  }, [placeholders]);

  useEffect(() => {
    let timeoutId;

    const typeNextLetter = () => {
      const currentPlaceholder = placeholders[currentPlaceholderIndex];
      const nextLetter = currentPlaceholder.slice(typedText.length, typedText.length + 1);
      if (nextLetter) {
        setTypedText((prevTypedText) => prevTypedText + nextLetter);
        timeoutId = setTimeout(typeNextLetter, 20); // Adjust typing speed here
      }
    };

    timeoutId = setTimeout(typeNextLetter, 70); // Delay before starting to type
    return () => clearTimeout(timeoutId);
  }, [currentPlaceholderIndex, placeholders, typedText]);



  return (
    <>
      <div className={classNames('custom-scrollbar scroll-smooth py-1 px-6 bg-slate-950 h-screen overflow-hidden hover:overflow-y-auto')} style={{ wordBreak: "break-word", height: 'calc(100vh - 6.4rem)' }}>
        {messages?.map((message, index) =>
          message.isUser ? (
            <UserMessage key={index} topic={topic} message={message} />
          ) : (
            <>
              <BotMessage key={index} message={message} />
            </>
          )
        )}
        <div ref={messagesEndRef} className="mt-4" />
      </div>
      <div
        className={`bg-slate-950 border-2 border-blue-800 rounded-xl mx-auto px-2 w-11/12`}
      >
        {!user?.firstTime ? (<div className="py-1 inline-flex rounded-md shadow-sm">
          {!user?.firstTime && topics?.map((item) => (
            <>
              <button
                onClick={() => setTopic({ id: item?.id, title: item?.title })}
                key={item?.id}
                type="button"
                className={`${colorVariants[item.color]
                  } text-sm mr-2 my-2 px-3 py-1 font-medium text-white rounded hover:bg-yellow-500 hover:text-gray-900 focus:z-10  ${topic?.id === item?.id
                    ? `bg-green-500 text-gray-900`
                    : `${borderVariants[item.color]}`
                  }`}
              >
                {item?.title}
              </button>
            </>
          ))}
          {!user.firstTime && <button
            onClick={() => setIsBot(!isBot)}
            className="ml-2 text-white"
          >
            {!isBot ? "BOT" : "USER"}
          </button>}

        </div>) : <></>}
        <div className="flex items-center">
          <div className="relative min-w-full">
            {showPlaceholder && (
              <div
                className="z-0 select-none cursor-text wrap absolute w-full"
                onClick={() => {
                  const input = document.getElementById("textArea");
                  input.focus()
                }}>
                <p className="flip h-6 text-gray-400 opacity-65">
                  {placeholders.map((item) =>
                    <span key={item}>{item}</span>
                  )}
                </p>
              </div>)}
            <textarea
              type="text"
              rows={1}
              id="textArea"
              // placeholder={typedText}
              className="z-10 scrolling-placeholder-textarea text-sm pr-28 py-2 pl-2 block w-full resize-none no-scrollbar outline-none text-wrap bg-slate-950 text-gray-300"
              value={inputText}
              onFocus={() => setShowPlaceholder(false)}
              onBlur={() => setShowPlaceholder(true)}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.keyCode == 13 && !e.shiftKey) {
                  // prevent default behavior
                  e.preventDefault();
                  sendMessage()
                  return false;
                }
              }}
            />
            <button
              onClick={() => sendMessage()}
              className={`text-sm px-4 py-1 text-white absolute end-0 bottom-[4px] bg-blue-800 hover:bg-neutral-700 focus:outline-1 focus:outline-none focus:ring-blue-200 font-medium rounded-md`}
            >
              Submit
            </button>
          </div>
        </div>
        {/* <div class="flex items-center justify-between">
          <div>
            <div class="py-1 inline-flex items-center rounded-md shadow-sm">
              <span class="text-gray-500 font-thin mr-3">Mode</span>
              {modes?.map((item) => (
                <>
                  <button
                    key={item?.id}
                    type="button"
                    onClick={() => {
                      setCurrentModeBtn(item?.id);
                    }}
                    class={`me-2 px-1 py-1 bg-${item.themecolor
                      } hover:bg-gray-700 font-thin rounded-lg text-sm text-center inline-flex items-center
                    ${currentModeBtn === item?.id
                        ? `bg-${item.themecolor} text-gray-200`
                        : `text-gray-100 bg-${item.themecolor} bg-opacity-30`
                      }`}
                  >
                    {item.title}
                  </button>
                </>
              ))}

            </div>
          </div>
          <div>
            <a
              href="/"
              class="inline-flex items-center justify-center text-base font-medium text-gray-500 rounded-lg hover:text-gray-100 "
            >
              <span class="flex items-center">
                <FaRegShareSquare class="m-1" />
                Share conversation
              </span>
            </a>
          </div>
        </div> */}
      </div >
    </>
  );
};

export default ChatBotComponent;
