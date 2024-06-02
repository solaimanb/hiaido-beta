import { useAnimationControls } from "framer-motion";
import { useState } from "react";
import {
  AtSymbolIcon,
  ChatBubbleLeftRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloudArrowUpIcon,
  Cog6ToothIcon,
  CurrencyDollarIcon,
  MoonIcon,
  PresentationChartLineIcon,
  QuestionMarkCircleIcon,
  QueueListIcon,
  Squares2X2Icon,
  SquaresPlusIcon,
  SunIcon,
  TicketIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, Flex, Text } from "@radix-ui/themes";
import logo from "/hiaido-logo.png";
import * as Menubar from "@radix-ui/react-menubar";
import { NavLink } from "react-router-dom";

export const navbarData = [
  { label: "Dashboard", icon: <Squares2X2Icon className="w-6" /> },
  {
    label: "Chat",
    icon: <ChatBubbleLeftRightIcon className="w-6" />,
  },
  {
    label: "Account Factory",
    icon: <AtSymbolIcon className="w-6" />,
  },
  {
    label: "Usage Analytics",
    icon: <PresentationChartLineIcon className="w-6" />,
  },
  {
    label: "Deployments",
    icon: <CloudArrowUpIcon className="w-6" />,
  },
  { label: "Scheduler", icon: <QueueListIcon className="w-6" /> },
  {
    label: "Feature requests",
    icon: <SquaresPlusIcon className="w-6" />,
  },
  { label: "User management", icon: <UsersIcon className="w-6" /> },
  { label: "Billing", icon: <CurrencyDollarIcon className="w-6" /> },
  {
    label: "Tickets",
    icon: <TicketIcon className="w-6" />,
  },
  { label: "Settings", icon: <Cog6ToothIcon className="w-6" /> },
  {
    label: "Help",
    icon: <QuestionMarkCircleIcon className="w-6" />,
  },
];

const labelTransitions = {
  transition: { delay: "0.3", ease: "easeIn" },
  initial: {
    opacity: 0,
    transition: { delay: 0.2 },
  },
  animate: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
    transition: { delay: 0 },
  },
};

const Sidebar = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(1);
  const [isCollapsed, setIsCollapsed] = useState(false);
  console.log("sidebar");

  const data = [
    { label: "Light", icon: <SunIcon className="w-5 " /> },
    { label: "Dark", icon: <MoonIcon className="w-5 " /> },
  ];
  const sliceIndex = 9;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className={`bg-neutral-800 relative h-full rounded-lg text-[13px] flex flex-col ${
          isCollapsed ? "p-1 py-3 " : "p-3"
        }`}
        variants={{
          expand: {
            width: "210px",
          },
          collapse: {
            width: "48px",
            transition: { delay: 0.3 },
          },
        }}
        animate={isCollapsed ? "collapse" : "expand"}
      >
        <div
          className={`flex items-center justify-start my-4 text-2xl pl-1 ${""}`}
        >
          <img
            className={`w-8 h-8 ${isCollapsed || "mr-2"}`}
            src={logo}
            alt="Brand Logo"
          />
          <AnimatePresence>
            {isCollapsed || <motion.h1 {...labelTransitions}>HiAiDo</motion.h1>}
          </AnimatePresence>
        </div>
        <div className="divide-neutral-600 h-full">
          <div className="text-neutral-400 my-2 space-y-[5px]">
            <motion.div className="text-neutral-500 my-2 h-3 text-xs font-semibold">
              <AnimatePresence>
                {isCollapsed || (
                  <motion.span {...labelTransitions}>MAIN</motion.span>
                )}
              </AnimatePresence>
            </motion.div>
            <NavLinksGroup
              groupData={navbarData.slice(0, sliceIndex)}
              isCollapsed={isCollapsed}
            />
          </div>
          <div className="h-[1px] bg-neutral-700/75 my-2"></div>
          <div className="text-neutral-400 mt-5 h-full space-y-[5px]">
            <div className="text-neutral-500 my-2 h-3 text-xs font-semibold">
              <AnimatePresence>
                {isCollapsed || (
                  <motion.span {...labelTransitions}>SUPPORT</motion.span>
                )}
              </AnimatePresence>
            </div>

            <NavLinksGroup
              groupData={navbarData.slice(sliceIndex)}
              isCollapsed={isCollapsed}
            />
          </div>
        </div>
        <div className="flex flex-col h-fit items-center justify-end mx-3 space-y-2">
          {
            // isCollapsed ? (
            //   <div className="">{data[parseInt(activeTabIndex)].icon}</div>
            // ) :
            <Menubar.Root
              className={`flex bg-neutral-900 w-fit ${
                isCollapsed ? "m-[6px]" : "p-[6px]"
              } rounded-full shadow-blackA4 space-x-3 justify-start`}
            >
              {data.map((item, i) => {
                return (
                  <AnimatePresence key={i}>
                    {(isCollapsed && i != activeTabIndex) || (
                      <motion.div {...labelTransitions}>
                        <Menubar.Menu key={item.id || i}>
                          <Menubar.Trigger
                            onClick={() => {
                              setActiveTabIndex(i);
                            }}
                            className={`${
                              isCollapsed ? "p-[6px]" : "p-[7px]"
                            } outline-none select-none font-medium leading-none rounded-full relative ${
                              i == activeTabIndex
                                ? ""
                                : "hover:bg-neutral-600/35"
                            }`}
                            style={{
                              WebkitTapHighlightColor: "transparent",
                            }}
                          >
                            <div className="flex items-center justify-center">
                              {item.icon}
                              <AnimatePresence>
                                {isCollapsed || (
                                  <motion.span
                                    className="text-sm ml-2"
                                    {...labelTransitions}
                                  >
                                    {item.label}
                                  </motion.span>
                                )}
                              </AnimatePresence>
                              {activeTabIndex == i && (
                                <motion.span
                                  layoutId="theme-bubble"
                                  className="bg-cyan-100 mix-blend-difference absolute inset-0 z-10 rounded-full"
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
                      </motion.div>
                    )}
                  </AnimatePresence>
                );
              })}
            </Menubar.Root>
          }

          <div className="h-[1px] bg-neutral-600"></div>
          <div
            align="center"
            className="!border-t-[1px] !border-neutral-600 pt-5 pb-1 flex w-full space-x-3"
          >
            <Avatar src="" fallback="U" radius="full" size="2" />
            <AnimatePresence>
              {isCollapsed || (
                <motion.div className="max-w-[70%]" {...labelTransitions}>
                  <Text truncate size={"2"}>
                    Nadine Schtakieff
                  </Text>
                  <Text truncate size={"1"} className="text-neutral-500 text-sm">
                    Frontend Developer
                  </Text>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute top-16 -right-4 bg-neutral-700 p-2 rounded-full"
        >
          {isCollapsed ? (
            <ChevronRightIcon className="w-4 h-4" />
          ) : (
            <ChevronLeftIcon className="w-4 h-4" />
          )}
        </button>
      </motion.div>
    </AnimatePresence>
  );
};

const NavLinksGroup = ({ groupData, isCollapsed }) => {
  return (
    <>
      {groupData.map((item, i) => {
        return (
          <NavLink
            to={`/${item.label.replace(" ", "-").toLowerCase()}`}
            key={item.id || i}
            // onClick={() => setNavTabIndex(i)}
            className={({ isActive }) =>
              `rounded-lg flex items-center justify-start py-1 ${
                isCollapsed || "w-full"
              } outline-none p-[1px] px-2 ${
                isActive
                  ? "bg-neutral-600 text-white"
                  : "hover:bg-neutral-700 duration-300 hover:text-neutral-300"
              }`
            }
          >
            {item.icon}
            <AnimatePresence>
              {isCollapsed || (
                <motion.span className="text-left ml-3" {...labelTransitions}>
                  {item.label}
                </motion.span>
              )}
            </AnimatePresence>
          </NavLink>
        );
      })}
    </>
  );
};

export default Sidebar;
