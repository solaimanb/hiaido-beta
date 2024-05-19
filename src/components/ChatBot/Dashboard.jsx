import React, { useState } from "react";
// import * as Popover from "@radix-ui/react-popover";
// import * as Tabs from "@radix-ui/react-tabs";
import classNames from "classnames";
import { CubeIcon, GlobeIcon, UploadIcon } from "@radix-ui/react-icons";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { DropdownMenu, Button } from "@radix-ui/themes";
import * as Menubar from "@radix-ui/react-menubar";
import { motion } from "framer-motion";
import { useAuthenticator } from "@aws-amplify/ui-react";

// import '@radix-ui/themes/styles.css';

export default function Dashboard() {
  const { user, signOut } = useAuthenticator((context) => [context.user]);

  return (
    <div className="flex flex-col justify-center w-full">
      <div className="flex justify-end w-full h-20 pr-10 my-6 text-4xl">
        <DropdownMenu.Root>
          <DropdownMenu.Trigger className="!duration-200">
            <Button variant="soft" size="4">
              Account
              <DropdownMenu.TriggerIcon />
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content size="2">
            <DropdownMenu.Item className="!text-lg !p-5 !mx-2 !my-1 duration-300">
              Profile
            </DropdownMenu.Item>
            <DropdownMenu.Item className="!text-lg !p-5 !mx-2 !my-1 duration-300">
              Settings
            </DropdownMenu.Item>
            <DropdownMenu.Item
              onClick={signOut}
              className="!text-lg !p-5 !mx-2 !my-1 duration-300"
            >
              Log out
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </div>
      <div className="pr-15 border-l-[1px] border-neutral-700/85 pl-10">
        <DashboardSection />
      </div>
    </div>
  );
}

const RADIO_ITEMS = ["Andy", "Benoît", "Luis"];
const CHECK_ITEMS = ["Always Show Bookmarks Bar", "Always Show Full URLs"];

const DashboardSection = () => {
  const [selectedOption, setSelectedOption] = useState("Sky");
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const handleSelection = () => {
    setSelectedOption;
  };

  const data = [
    {
      label: "Sky",
      icon: <GlobeIcon className="w-6 h-6 mx-2" />,
      content: "Sky",
    },
    {
      label: "Resources",
      icon: <CubeIcon className="w-6 h-6 mx-2" />,
      content: "Manage your resources",
    },
    {
      label: "Deployments",
      icon: <UploadIcon className="w-6 h-6 mx-2" />,
      content: "Manage all your deployments from one place",
    },
  ];

  return (
    <div className="space-y-4">
      <Menubar.Root className="bg-neutral-800/80 shadow-blackA4 flex justify-around w-full py-3 space-x-2 rounded-lg">
        {data.map((item, i) => {
          return (
            <Menubar.Menu key={i}>
              <Menubar.Trigger
                onClick={() => {
                  // setSelectedOption(item);
                  setActiveTabIndex(i);
                }}
                className={`py-2 w-fit px-6 outline-none select-none font-medium leading-none rounded-lg relative ${
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
                  <span className="text-lg">{item.label}</span>
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
      <div className="w-full h-[500px]  rounded-lg p-4">
        {data[activeTabIndex].content}
      </div>
    </div>
  );
};

const ListItem = React.forwardRef(
  ({ className, children, title, ...props }, forwardedRef) => (
    <li>
      <NavigationMenu.Link asChild>
        <a
          className={classNames(
            "focus:shadow-violet7 hover:bg-mauve3 block select-none rounded-[6px] p-2 text-[15px] leading-none no-underlin transition-colors",
            className
          )}
          {...props}
          ref={forwardedRef}
        >
          <div className="text-violet12 px-4 hover:bg-neutral-800 mb-[2px] font-medium leading-[1.2]">
            {title}
          </div>
          <p className="text-mauve11 px-4 hover:bg-neutral-800 leading-[1.4]">
            {children}
          </p>
        </a>
      </NavigationMenu.Link>
    </li>
  )
);

ListItem.displayName = "ListItem";
