import { ThemeContext } from "../context/ThemeContext";
import React, { useContext } from "react";
import ReactMarkdown from "react-markdown";
import {
  gruvboxDark,
  materialLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";
import Codeblock from "./ChatBot/Codeblock";

interface MDXProps {
  content: string;
}

const MDX: React.FC<MDXProps> = ({ content }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      className="markdown leading-relaxed text-sm md:text-[15px] w-full"
      components={{
        code(props) {
          const { children, className, node, ...rest } = props;
          const match = /language-(\w+)/.exec(className || "");

          return match ? (
            <Codeblock
              language={match[1]}
              code={(children as string).trim()}
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
        hr: (props) => <hr className="!bg-neutral-300 !h-[1px]"></hr>,
        table: (props) => {
          // console.log(props.children)
          return <table {...props} className="!overflow-x-hidden w-[200px]" />
        }
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
      {content}
    </ReactMarkdown>
  );
};

export default MDX;
