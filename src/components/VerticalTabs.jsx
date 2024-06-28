import React from 'react';

const VerticalTabs = ({ tabs, activeTab, setactiveTab }) => {
    return (
        <div className='max-w-6xl mx-auto  flex flex-col md:flex-row gap-2 items-center bg-black p-3 rounded-lg text-white'>
            <div className='w-full max-w-xs flex md:flex-col gap-3 justify-start '>
                {tabs.map((child, index) => (
                    <button
                        className={`p-3 font-bold text-left transition-all delay-75 hover:text-orange-400  ${activeTab === index ? '  text-orange-400 border-b md:border-b-0 md:border-l border-orange-400' : ''}`}
                        onClick={() => setactiveTab(index)}
                    >
                        {child.title}
                    </button>
                ))}
            </div>
            <div className="content mt-6 md:mt-0 h-[calc(100dvh_-_30dvh)] md:h-[calc(100dvh_-_10dvh)] overflow-auto">
                {tabs[activeTab].content}
            </div>
        </div>
    )
}

export default VerticalTabs