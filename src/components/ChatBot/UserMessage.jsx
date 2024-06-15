import { BiSolidQuoteLeft } from "react-icons/bi";

const UserMessage = ({ message }) => {
  return (
    <div className="text-sm self-start mt-1">
      <div className="rounded-lg text-orange-500 px-4">
        <span className="flex text-base">
          <BiSolidQuoteLeft size={16} class="mr-2" /> {message.text}{" "}
        </span>
        <div className="pl-7 text-gray-400">{message?.topic}</div>
      </div>
    </div>
  );
};

export default UserMessage;
