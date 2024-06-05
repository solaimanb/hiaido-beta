import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { CopyIcon } from "@radix-ui/react-icons";
import toast from "react-hot-toast";

const copyContent = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  } catch (err) {
    alert("Failed to copy", err);
  }
};

let pretag = ({ children, className, ...rest }) => {
  return (
    <pre
      {...rest}
      className={`${className} rounded-b-md !my-0 w-[720px]`}
    >
      {children}
    </pre>
  );
};

let codetag = ({ children, className, ...rest }) => {
  return (
    <code
      {...rest}
      className={`${className} rounded-b-md !my-0  !overflow-x-scroll text-sm`}
      style={{ fontFamily: "monospace" }}

    >
      {children}
    </code>
  );
};

const Codeblock = ({ code, language, theme }) => {
  return (
    <div
      className="w-full my-4 overflow-x-auto rounded-lg p-0 drop-shadow-lg"
      style={{ fontFamily: "monospace" }}
    >
      <div className="flex bg-neutral-900 rounded-t-md justify-between w-[720px] items-center p-2 px-4">
        <div className="text-xs dark:text-neutral-50 text-neutral-50">{language}</div>
        <div className="">
          <CopyIcon
            className="cursor-pointer text-neutral-100"
            onClick={async () => {
              await copyContent(code);
            }}
          />
        </div>
      </div>
      <SyntaxHighlighter
        lineNumberStyle={{ fontFamily: "monospace" }}
        style={theme}
        showLineNumbers
        // wrapLongLines
        // wrapLines
        PreTag={pretag}
        CodeTag={codetag}
        language={language}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default Codeblock;
