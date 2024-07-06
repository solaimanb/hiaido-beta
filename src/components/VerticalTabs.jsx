import { NavLink } from 'react-router-dom';
import { hiaido } from "../assets";

const VerticalTabs = ({ tabs, activeTab, setactiveTab }) => {
    return (
        <div className='max-w-6xl mx-auto flex flex-col md:flex-row gap-2 items-center bg-black p-3 rounded-lg text-white'>
            <div className='flex flex-col justify-between items-center md:h-[calc(100dvh_-_10dvh)]'>
                <NavLink className="block mt-3" to="/">
                    <img src={hiaido} alt="hiaido" className="w-24 md:w-40 lg:w-48" />
                </NavLink>
                <div className='w-full flex flex-col gap-3 justify-start '>
                    {tabs.map((child, index) => (
                        <button
                            key={index}
                            className={`p-3 text-nowrap font-bold text-left transition-all delay-75 hover:text-orange-400  ${activeTab === index ? '  text-orange-400 border-b md:border-b-0 md:border-l border-orange-400' : ''}`}
                            onClick={() => setactiveTab(index)}
                        >
                            {child.title}
                        </button>
                    ))}
                </div>
                <div></div>
            </div>
            <div className="content w-full mt-6 md:mt-0 h-[calc(100dvh_-_40dvh)] md:h-[calc(100dvh_-_10dvh)] overflow-auto scrollbar-thin scrollbar-track-orange-100 scrollbar-thumb-orange-400 ">
                {tabs[activeTab].content}
            </div>
        </div>
    )
}

export default VerticalTabs
