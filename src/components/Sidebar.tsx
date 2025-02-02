import React, { useContext, useEffect, useState } from "react";
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
import logo from "/hiaido-logo.png";
import * as Menubar from "@radix-ui/react-menubar";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import { fetchAuthSession, signOut } from "aws-amplify/auth";
import logoSidebar from "/logo-sidebar.png";
import { GlobalStateContext } from "@/context/GlobalStateContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/ui-components/ui/dropdown-menu";
import {
  CalendarCheck2,
  LogOut,
  Menu,
  MessageSquare,
  Subscript,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/ui-components/ui/avatar";
import { ScrollArea } from "@/ui-components/ui/scroll-area";
import toast from "react-hot-toast";
import Loader from "./Loader";
import { Sheet, SheetContent, SheetTrigger } from "@/ui-components/ui/sheet";

export const navbarData = [
  // { label: "Dashboard", icon: <Squares2X2Icon className="w-6" /> },
  {
    label: "Chat",
    icon: <ChatBubbleLeftRightIcon className="w-6" />,
  },
  {
    label: "Account Factory",
    icon: <AtSymbolIcon className="w-6" />,
  },
  { label: "Subscriptions", icon: <CalendarCheck2 className="w-5" /> },
  // {
  //   label: "Usage Analytics",
  //   icon: <PresentationChartLineIcon className="w-6" />,
  // },
  // {
  //   label: "Deployments",
  //   icon: <CloudArrowUpIcon className="w-6" />,
  // },
  // { label: "Scheduler", icon: <QueueListIcon className="w-6" /> },
  // {
  //   label: "Feature requests",
  //   icon: <SquaresPlusIcon className="w-6" />,
  // },
  // { label: "User management", icon: <UsersIcon className="w-6" /> },
  // { label: "Billing", icon: <CurrencyDollarIcon className="w-6" /> },
  // {
  //   label: "Tickets",
  //   icon: <TicketIcon className="w-6" />,
  // },
  // { label: "Settings", icon: <Cog6ToothIcon className="w-6" /> },
  // {
  //   label: "Help",
  //   icon: <QuestionMarkCircleIcon className="w-6" />,
  // },
];

const labelTransitions = {
  transition: { delay: 0.3, ease: "easeIn" },
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

const ToggleTheme: React.FC<{ isCollapsed: boolean }> = ({ isCollapsed }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  // console.log(theme);
  const [activeTabIndex, setActiveTabIndex] = useState(
    theme === "dark" ? 1 : 0
  );
  const data = [
    { label: "Light", icon: <SunIcon className=" w-5" /> },
    { label: "Dark", icon: <MoonIcon className=" w-5" /> },
  ];

  return (
    <Menubar.Root
      className={`flex dark:bg-neutral-900 bg-white text-white w-fit ${
        isCollapsed ? "md:m-[6px]" : "md:p-[3px]"
      } rounded-full shadow-blackA4 p-2 space-x-1 justify-start md:relative`}
    >
      {data.map((item, i) => {
        return (
          <AnimatePresence key={i}>
            {(isCollapsed && i != activeTabIndex) || (
              <motion.div {...labelTransitions}>
                <Menubar.Menu key={item.label || i}>
                  <Menubar.Trigger
                    onClick={() => {
                      if (activeTabIndex != i) {
                        toggleTheme();
                        setActiveTabIndex(i);
                      }
                    }}
                    className={`${
                      isCollapsed ? "p-[8px]" : "p-[8px]"
                    } outline-none select-none font-medium leading-none rounded-full relative ${
                      i == activeTabIndex
                        ? ""
                        : "dark:hover:bg-neutral-600/35 hover:bg-black/30"
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
                            className="text-sm px-2"
                            {...labelTransitions}
                          >
                            {item.label}
                          </motion.span>
                        )}
                      </AnimatePresence>
                      {activeTabIndex == i && (
                        <motion.span
                          layoutId="theme-bubble"
                          className={`${
                            isCollapsed ? "bg-black" : "bg-white"
                          } mix-blend-difference absolute inset-0 !z-50 rounded-full`}
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
  );
};

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const sliceIndex = 9;

  return (
    <>
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger>
            <button className="relative">
              <Menu className="absolute z-50 ml-3 -mt-1" />
            </button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="dark:bg-neutral-800 h-full flex flex-col"
          >
            <div
              className={`flex items-center justify-start my-4 text-2xl pl-1`}
            >
              <div className="w-[80%] p-2">
                <img className="w-full" src={logoSidebar} alt="Hiaido logo" />
              </div>
            </div>
            <div className="dark:divide-neutral-600 divide-neutral-600 flex-1">
              <div className=" text-neutral-400 my-2 space-y-[5px]">
                <motion.div className="dark:text-neutral-500 text-neutral-400 my-2 h-3 text-xs font-semibold">
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
              {/* <div className="h-[1px] dark:bg-neutral-700/75 bg-neutral-800 my-2"></div> */}
              {/* <div className="text-neutral-400 mt-5 h-full space-y-[5px]">
            <div className="dark:text-neutral-500 text-neutral-400 my-2 h-3 text-xs font-semibold">
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
          </div> */}
            </div>
            <div className="h-fit flex flex-col items-center justify-end mx-3 space-y-2">
              <ToggleTheme isCollapsed={isCollapsed} />
              <div className="h-[1px] dark:bg-neutral-700/75 bg-neutral-800"></div>
              <CurrentMemberAccountComponent isCollapsed={isCollapsed} />
            </div>
          </SheetContent>
        </Sheet>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          className={`dark:bg-neutral-800 bg-neutral-950 relative h-full text-[13px] hidden md:flex flex-col ${
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
            {isCollapsed ? (
              <img
                className={`w-8 h-8 ${isCollapsed || "mr-2"}`}
                src={logo}
                alt="Brand Logo"
              />
            ) : (
              <div className="w-[80%] p-2">
                <img className="w-full" src={logoSidebar} alt="Hiaido logo" />
              </div>
            )}
          </div>
          <div className="dark:divide-neutral-600 divide-neutral-600 h-full">
            <div className=" text-neutral-400 my-2 space-y-[5px]">
              <motion.div className="dark:text-neutral-500 text-neutral-400 my-2 h-3 text-xs font-semibold">
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
            {/* <div className="h-[1px] dark:bg-neutral-700/75 bg-neutral-800 my-2"></div> */}
            {/* <div className="text-neutral-400 mt-5 h-full space-y-[5px]">
            <div className="dark:text-neutral-500 text-neutral-400 my-2 h-3 text-xs font-semibold">
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
          </div> */}
          </div>
          <div className="h-fit flex flex-col items-center justify-end mx-3 space-y-2">
            <ToggleTheme isCollapsed={isCollapsed} />
            <div className="h-[1px] dark:bg-neutral-700/75 bg-neutral-800"></div>
            <CurrentMemberAccountComponent isCollapsed={isCollapsed} />
          </div>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="absolute top-16 -right-4 dark:bg-neutral-700 bg-white p-2 rounded-full stroke-neutral-800 dark:stroke-white z-20 outline-none shadow-neutral-700 shadow-md dark:shadow-none"
          >
            {isCollapsed ? (
              <ChevronRightIcon className="size-5" />
            ) : (
              <ChevronLeftIcon className="size-5" />
            )}
          </button>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

const CurrentMemberAccountComponent: React.FC<{ isCollapsed: boolean }> = ({
  isCollapsed,
}) => {
  const { currentMemberAccount, memberAccounts, setCurrentMemberAccount } =
    useContext(GlobalStateContext);
  const navigate = useNavigate();
  console.log(currentMemberAccount);
  if (!currentMemberAccount || !memberAccounts) {
    return <Loader />;
  }
  // let currentMemberAccount = {
  //   role_arn: "arn:aws:iam::730335590432:role/OrganizationAccountAccessRole",
  //   account_name: "advant.analytics+1user012334",
  //   lastName: "Fe",
  //   timestamp: "2024-06-04T18:23:11.224000+00:00",
  //   owner: "r367708@gmail.com",
  //   region: "us-east-1",
  //   account_id: "730335590432",
  //   email: "advant.analytics+1user012334@gmail.com",
  //   firstName: "Arnoldo",
  //   owner_id: "f408b4e8-2031-7060-35bd-55174dc04329",
  //   account_status: "SUCCEEDED",
  // };
  const [memberAccountId, setMemberAccountId] = useState(
    currentMemberAccount.account_id
  );

  useEffect(() => {
    if (!memberAccounts) return;
    for (let acc of memberAccounts.memberAccounts) {
      if (acc.account_id === memberAccountId) {
        setCurrentMemberAccount(acc);
        console.log("Switching");
        break;
      }
    }
  }, [memberAccountId, memberAccounts]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          // align="center"
          className="!border-t-[1px] !border-neutral-600 pt-5 pb-1 flex w-full space-x-3 text-left cursor-pointer"
        >
          {isCollapsed ? (
            <span className="text-center mx-auto">
              {currentMemberAccount.alias
                ? currentMemberAccount.alias.charAt(0)
                : currentMemberAccount.firstName.charAt(0)}
            </span>
          ) : (
            <Avatar>
              <AvatarFallback className="bg-neutral-500 dark:bg-neutral-700">
                {currentMemberAccount.alias
                  ? currentMemberAccount.alias.charAt(0)
                  : currentMemberAccount.firstName.charAt(0)}
              </AvatarFallback>
            </Avatar>
          )}
          <AnimatePresence>
            {isCollapsed || (
              <motion.div className="max-w-[70%]" {...labelTransitions}>
                <p className="truncate text-neutral-100">
                  {currentMemberAccount.alias
                    ? currentMemberAccount.alias
                    : currentMemberAccount.firstName +
                      " " +
                      currentMemberAccount.lastName}
                </p>
                <p className="truncate text-neutral-500/90">
                  {currentMemberAccount.alias
                    ? currentMemberAccount.account_id
                    : currentMemberAccount.email}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <ScrollArea className="max-h-60">
          <DropdownMenuRadioGroup
            value={currentMemberAccount.account_id}
            onValueChange={(accId) => {
              setMemberAccountId(accId);
            }}
          >
            {memberAccounts.memberAccounts.map((acc) => (
              <DropdownMenuRadioItem
                value={acc.account_id}
                key={acc.email}
                onClick={() => {
                  setCurrentMemberAccount(acc);
                  localStorage.setItem(
                    "current_member_account",
                    JSON.stringify(acc)
                  );
                }}
                className="gap-2"
              >
                {/* <Avatar className="text-xs">
                <AvatarFallback>{acc.firstName.charAt(0)}</AvatarFallback>
              </Avatar> */}
                <div className="flex flex-col pr-2 max-w-[75%]">
                  <p className="text-black dark:text-neutral-100 text-sm truncate">
                    {acc.firstName + " " + acc.lastName}
                  </p>
                  <p className="text-neutral-500/90 text-xs truncate">
                    {acc.email}
                  </p>
                </div>
              </DropdownMenuRadioItem>
            ))}
            {memberAccounts.connectedAccounts.map((acc) => (
              <DropdownMenuRadioItem
                value={acc.account_id}
                key={acc.account_id}
                onClick={() => {
                  setCurrentMemberAccount(acc);
                  localStorage.setItem(
                    "current_member_account",
                    JSON.stringify(acc)
                  );
                }}
                className="gap-2"
              >
                {/* <Avatar className="text-xs">
                <AvatarFallback>{acc.firstName.charAt(0)}</AvatarFallback>
              </Avatar> */}
                <div className="flex flex-col pr-2 max-w-[75%]">
                  <p className="text-black dark:text-neutral-100 text-sm truncate">
                    {acc.alias}
                    {/* {acc.firstName + " " + acc.lastName} */}
                  </p>
                  <p className="text-neutral-500/90 text-xs truncate">
                    {/* {acc.email} */}
                    {acc.account_id}
                  </p>
                </div>
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </ScrollArea>
        {/* <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={async () => {
            localStorage.removeItem("current_member_account");
            await signOut();
            navigate("/login");
          }}
          className="py-2"
        >
          <LogOut className="mr-2 size-4" />
          <span>Log out</span>
        </DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const NavLinksGroup: React.FC<{
  groupData: {
    label: string;
    icon: JSX.Element;
  }[];
  isCollapsed: boolean;
}> = ({ groupData, isCollapsed }) => {
  return (
    <>
      {groupData.map((item, i) => {
        return (
          <NavLink
            to={`/${item.label.replace(" ", "-").toLowerCase()}`}
            key={item.label || i}
            // onClick={() => setNavTabIndex(i)}
            className={({ isActive }) =>
              `rounded-lg flex items-center justify-start py-1 ${
                isCollapsed || "w-full"
              } outline-none p-[1px] px-2 ${
                isActive
                  ? "dark:bg-neutral-600 bg-neutral-200 dark:text-white text-black"
                  : "dark:hover:bg-neutral-700 hover:bg-neutral-300 duration-300 dark:hover:text-neutral-300 hover:text-neutral-800"
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
