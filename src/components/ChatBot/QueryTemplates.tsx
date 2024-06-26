import { useGlobalState } from "@/context/GlobalStateContext";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";

interface QueryTemplatesProps {
  askQuery: (item: string) => {};
}

interface TypingTextProps {
  text: string;
  typingSpeed?: number; // Optional prop to control typing speed
}

const TypingText: React.FC<TypingTextProps> = ({ text, typingSpeed = 75 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const typingTimer = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayedText((prev) => {
          if (prev.length < text.length) {
            return text.substring(0, prev.length + 1);
          }
          clearInterval(interval); // Stop the interval when the full text is displayed
          return prev;
        });
      }, typingSpeed);
    }, 1000); // Start the animation after 2 seconds

    return () => clearTimeout(typingTimer); // Cleanup on component unmount
  }, [text, typingSpeed]);

  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500); // Blinking effect every 500ms

    return () => clearInterval(cursorTimer); // Cleanup on component unmount
  }, []);

  return (
    <span>
      {displayedText}
      <span style={{ opacity: showCursor ? 1 : 0, fontWeight: 'bold' }}>|</span>
    </span>
  );
};


const QueryTemplates: React.FC<QueryTemplatesProps> = ({ askQuery }) => {
  const data = [
    "How to create an S3 bucket?",
    "How to create an ETL pipeline using AWS Glue?",
    "How to monitor a Lambda function?",
    "How to setup a Elastic Load Balancer for EC2?",
  ];
  const { currentMemberAccount } = useGlobalState();

  return (
    <div className="relative h-full flex justify-center pt-10 pb-60 flex-col">
      <div className="w-[700px] welcome-texts mx-auto my-20">
        <div className="text-8xl font-bold text-gradient h-[100px] my-5 inline-block">Hello, {currentMemberAccount?.firstName}</div>
        <div className="text-5xl dark:text-neutral-500 text-neutral-700 font-semibold">
          <TypingText text="How can I help you today?" />
          {/* How can I help you today? */}
        </div>
      </div>
      <div className="flex w-full justify-center space-x-4">
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

export default QueryTemplates;
