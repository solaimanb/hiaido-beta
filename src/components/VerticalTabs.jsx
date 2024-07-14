// import { NavLink } from 'react-router-dom';
import { hiaido } from "../assets";

const VerticalTabs = ({ tabs, activeTab }) => {
  return (
    <div className="max-w-6xl mx-auto flex flex-col h-full md:flex-row gap-2 items-center bg-black p-3 rounded-lg text-white">
      <div className="hidden md:flex flex-col justify-start items-center w-32 md:w-auto md:h-[calc(100dvh_-_10dvh)]">
        <div className="block mt-3" to="/">
          <img src={hiaido} alt="hiaido" className="w-24 md:w-40 lg:w-48" />
        </div>
        <div className="w-full flex flex-col gap-3 justify-center h-full
         ">
          {tabs.map((child, index) => (
            <button
              key={index}
              className={`p-3 text-nowrap font-bold text-left transition-all delay-75 hover:text-orange-400  ${
                activeTab === index
                  ? "  text-orange-400 border-b md:border-b-0 md:border-l border-orange-400"
                  : ""
              }`}
              // onClick={() => setactiveTab(index)}
            >
              {child.title}
            </button>
          ))}
        </div>
      </div>
      <div className="content w-full md:min-w-[480px] h-full overflow-auto scrollbar-thin scrollbar-track-orange-100 scrollbar-thumb-orange-400 ">
        {tabs[activeTab].content}
      </div>
    </div>
  );
};

export default VerticalTabs;
