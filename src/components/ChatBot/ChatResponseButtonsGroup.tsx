import { ArrowPathIcon } from "@heroicons/react/24/solid";
import { CopyIcon } from "@radix-ui/react-icons";
import { Tooltip } from "@radix-ui/themes";
import React from "react";
import toast from "react-hot-toast";

interface ChatResponseButtonsGroupProps {
  content: string;
}
const copyContent = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  } catch (err) {
    console.log(err);
    alert("Failed to copy " + err);
  }
};

const ChatResponseButtonsGroup: React.FC<ChatResponseButtonsGroupProps> = ({
  content,
}) => {
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

export default ChatResponseButtonsGroup;
