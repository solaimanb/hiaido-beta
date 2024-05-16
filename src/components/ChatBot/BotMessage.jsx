import { AiOutlineDislike } from "react-icons/ai";
import { AiOutlineLike } from "react-icons/ai";
import { VscRefresh } from "react-icons/vsc";

const BotMessage = ({ message }) => {
  const { isHTML, text: Text } = message
  return (
    <div className="text-sm self-start">
      <div
        className={`rounded-lg text-white py-2 px-10 font-medium`}
      >
        {isHTML ? (<Text />) : Text}
      </div>
      {!isHTML && (
        <div>
          <div className="sm:flex sm:justify-between px-10">
            <div>
              <div className="inline-flex  dark:border-gray-700">
                <button type="button" className="inline-flex flex-shrink-0 justify-center items-center size-6 rounded-full text-gray-500 hover:bg-blue-100 hover:text-blue-800 focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-800 dark:hover:bg-blue-900 dark:hover:text-blue-200">
                  <AiOutlineLike size={"18"} />
                </button>
                <button type="button" className="inline-flex flex-shrink-0 justify-center items-center size-6 rounded-full text-gray-500 hover:bg-blue-100 hover:text-blue-800 focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-800 dark:hover:bg-blue-900 dark:hover:text-blue-200">
                  <AiOutlineDislike size={"18"} />
                </button>
              </div>
            </div>
            <div className="mt-1 sm:mt-0"><button type="button" className="py-1 px-2 inline-flex items-center gap-x-2 text-sm rounded-full border border-transparent text-gray-500 hover:text-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:text-gray-400 dark:hover:bg-gray-700">
              <VscRefresh size={"14"} /> New answer
            </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BotMessage;
