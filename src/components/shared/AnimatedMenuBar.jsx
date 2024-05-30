import * as Menubar from "@radix-ui/react-menubar";
import { motion } from "framer-motion";

const AnimatedMenuBar = ({ menuData, activeTabIndex, setActiveTabIndex }) => {
  return (
    <Menubar.Root className="flex bg-neutral-800 py-2 w-fit px-2 rounded-lg shadow-blackA4 space-x-2 justify-start">
      {menuData.map((item, i) => {
        return (
          <Menubar.Menu key={i}>
            <Menubar.Trigger
              onClick={() => {
                // setSelectedOption(item);
                setActiveTabIndex(i);
              }}
              className={`py-2 w-fit px-3 outline-none select-none font-medium leading-none rounded-lg relative ${
                i === activeTabIndex
                  ? // ? "bg-cyan-100 text-neutral-800"
                    ""
                  : "hover:bg-neutral-600/35"
              }`}
              style={{
                WebkitTapHighlightColor: "transparent",
              }}
            >
              <div className="flex items-center justify-center">
                {item.icon}
                <span className="text-sm">{item.label}</span>
                {activeTabIndex == i && (
                  <motion.span
                    layoutId="bubble"
                    className="bg-cyan-100 mix-blend-difference absolute inset-0 z-10 rounded-lg"
                    transition={{
                      type: "spring",
                      bounce: 0.1,
                      duration: 0.6,
                    }}
                  />
                )}
              </div>
            </Menubar.Trigger>
          </Menubar.Menu>
        );
      })}
    </Menubar.Root>
  );
};

export default AnimatedMenuBar;
