import classNames from 'classnames';
import { useState } from 'react';
import { tabs } from '../../constants';

const Tabs = () => {
    const [activeTab, setActiveTab] = useState(tabs[0].title);

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className="mb-4">
            <ul className="flex flex-wrap -mb-px text-thin font-thin text-center" id="default-styled-tab" role="tablist">
                {tabs.map((item) =>
                    <li className="me-2" key={item.id} role="presentation">
                        <button
                            className={classNames("inline-block p-4 border-b-2 rounded-t-lg", {
                                "text-orange hover:text-orange border-orange": activeTab === item.title,
                                "hover:text-gray-300 text-gray-500 border-gray-500 hover:border-gray-300": activeTab !== item.title
                            })}
                            id={`${item.title}-styled-tab`}
                            onClick={() => handleTabClick(item?.title)}
                            type="button"
                            role="tab"
                            aria-controls={item?.title}
                            aria-selected={activeTab === item?.title}
                        >
                            {item.title}
                        </button>
                    </li>)}

            </ul>

            <div id="default-styled-tab-content">
                {tabs.map((item) =>
                    <div key={item.id} className={classNames("p-4 rounded-lg bg-slate-950", { "hidden": activeTab !== item?.title })} id={`styled-${item.title}`} role="tabpanel" aria-labelledby={`${item.title}-tab`}>
                        <p className="text-sm text-gray-300 mt-3 mb-6">{item.content}</p>
                        {item?.HTML && <item.HTML />}
                    </div>)}
            </div>
        </div>
    );
};

export default Tabs;
