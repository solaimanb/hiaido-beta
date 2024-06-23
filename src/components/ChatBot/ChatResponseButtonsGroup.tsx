import { ArrowPathIcon } from "@heroicons/react/24/solid";
import { CopyIcon } from "@radix-ui/react-icons";
import { Tooltip } from "@radix-ui/themes";
import { Copy, RefreshCw, Share2, ThumbsDown, ThumbsUp } from "lucide-react";
import React from "react";
import toast from "react-hot-toast";

interface ChatResponseButtonsGroupProps {
  content: string;
}
const copyContent = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard", { position: "bottom-left" });
  } catch (err) {
    console.log(err);
    alert("Failed to copy " + err);
  }
};

const ChatResponseButtonsGroup: React.FC<ChatResponseButtonsGroupProps> = ({
  content,
}) => {
  const size = "size-[18px]";
  return (
    <div className="my-3 flex space-x-3 mb-60">
      <Tooltip content="Regenerate">
        <button className="hover:stroke-neutral-600 stroke-neutral-500 outline-none">
          <RefreshCw className={`${size}`} />
        </button>
      </Tooltip>
      <Tooltip content="Copy response">
        <button
          onClick={() => {
            copyContent(content);
          }}
          className="hover:stroke-neutral-600 stroke-neutral-500 outline-none"
        >
          <Copy className={`${size}`} />
        </button>
      </Tooltip>
      <Tooltip content="Like">
        <button className="hover:stroke-neutral-600 stroke-neutral-500 outline-none">
          <ThumbsUp className={`${size}`} />
        </button>
      </Tooltip>
      <Tooltip content="Dislike">
        <button className="hover:stroke-neutral-600 stroke-neutral-500 outline-none">
          <ThumbsDown className={`${size}`} />
        </button>
      </Tooltip>
      <Tooltip content="Share">
        <button className="hover:stroke-neutral-600 stroke-neutral-500 outline-none">
          <Share2 className={`${size}`} />
        </button>
      </Tooltip>
    </div>
  );
};

export default ChatResponseButtonsGroup;
