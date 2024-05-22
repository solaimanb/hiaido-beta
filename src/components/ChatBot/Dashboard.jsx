import React, { useState } from "react";
import {
  ArrowRightIcon,
  CubeIcon,
  GlobeIcon,
  UploadIcon,
} from "@radix-ui/react-icons";
import { DropdownMenu, Button, RadioGroup, Radio } from "@radix-ui/themes";
import * as Menubar from "@radix-ui/react-menubar";
import { motion } from "framer-motion";
import logo from "/hiaido-logo.png";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { useForm } from "@tanstack/react-form";
import toast from "react-hot-toast";
import { ArchiveBoxIcon, ArrowPathIcon } from "@heroicons/react/24/solid";

export default function Dashboard() {
  const { user, signOut } = useAuthenticator((context) => [context.user]);
  console.log(user.signInDetails.loginId);
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

const DashboardSection = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const data = [
    {
      label: "Sky",
      icon: <GlobeIcon className="w-6 h-6 mx-2" />,
      content: <SkySection />,
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
      <Menubar.Root className="flex bg-neutral-800 py-2 w-fit px-2 rounded-lg shadow-blackA4 space-x-2 justify-start">
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
                  <span className="text-base">{item.label}</span>
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

const SkySection = () => {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
    onSubmit: async (obj) => {
      setIsLoading(true);
      console.log(obj.value);
      const response = await fetch(
        "https://t19tszry50.execute-api.us-east-1.amazonaws.com/prod/create",
        {
          method: "POST",
          body: JSON.stringify(obj.value),
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.ok) {
        toast(
          (t) => {
            return (
              <div className="text-neutral-100 font-semibold">
                Account created successfully.
              </div>
            );
          },
          { style: { backgroundColor: "rgb(34, 160, 94)" } }
        );
        // obj.formApi.reset();
      } else {
        const res_json = await response.json();
        toast(
          (t) => {
            return (
              <div className="text-neutral-100 font-semibold">
                {res_json["error"] || "Some error occured."}
              </div>
            );
          },
          { style: { backgroundColor: "rgb(200, 68, 68)" } }
        );
      }
      setIsLoading(false);
    },
  });
  const [idx, setIdx] = useState(0);
  const data = [
    {
      label: "AWS",
      src: "https://scontent.famd3-1.fna.fbcdn.net/v/t39.30808-6/269757833_4570037896366873_6631612107011390481_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=5f2048&_nc_ohc=dFPvnsGEA2QQ7kNvgEI-2TK&_nc_ht=scontent.famd3-1.fna&oh=00_AYArKkMkwxeXOZKRGu60tHwR9qOZbPUE0mc1GyM3V0bSGA&oe=664EBDBF",
    },
    {
      label: "GCP",
      src: "https://pendulum-it.com/wp-content/uploads/2020/05/Google-Cloud-Platform-GCP-logo.png",
    },
    {
      label: "Azure",
      src: "https://i.pinimg.com/564x/85/d5/7e/85d57e14f76a63b4657020779e85dfd7.jpg",
    },
  ];
  return (
    <motion.div className="">
      <div className="grid grid-cols-4 gap-5 pb-5">
        {data.map((item, i) => {
          return (
            <div
              className="relative aspect-square col-span-1 rounded-md hover:scale-[1.02] hover:invert-[.1] duration-300 delay-100"
              onClick={() => setIdx(i)}
            >
              <Radio
                className="!absolute !m-2 !z-30"
                name="example"
                value="1"
                size={"2"}
                checked={i == idx}
              />
              <img src={item.src} alt="" className="rounded-xl w-full" />
            </div>
          );
        })}
      </div>
      <div className="h-[1px] bg-neutral-700 w-full"></div>
      <div className="w-full">
        <form
          className="relative py-5 grid grid-cols-2 gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <div className="col-span-1 w-full">
            <form.Field
              name="firstName"
              children={(field) => (
                <input
                  name={field.name}
                  className="appearance-none outline-none focus:ring-offset-green-700 w-full rounded-md p-3 bg-neutral-700/50"
                  placeholder="First name"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              )}
            />
          </div>
          <div className="col-span-1 w-full">
            <form.Field
              name="lastName"
              children={(field) => (
                <input
                  name={field.name}
                  className="appearance-none outline-none focus:ring-offset-green-700 w-full rounded-md p-3 bg-neutral-700/50"
                  placeholder="Last name"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              )}
            />
          </div>
          <div className="col-span-2 w-full">
            <form.Field
              name="email"
              validators={{
                onChange({ value }) {
                  return value.trim() === ""
                    ? "Email cannot be empty"
                    : undefined;
                },
              }}
              children={(field) => (
                <>
                  <input
                    name={field.name}
                    className="appearance-none outline-none focus:ring-offset-green-700 w-full rounded-md p-3 bg-neutral-700/50"
                    placeholder="Email"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <div className="text-red-500 h-3">
                    {field.state.meta.errors.length > 0 &&
                      field.state.meta.errors[0]}
                  </div>
                </>
              )}
            />
          </div>
          <div className="flex justify-end w-full col-span-2">
            <button
              className={`bg-cyan-100 text-black mt-10 p-3 px-5 rounded-lg space-x-3 w-fit flex items-center disabled:cursor-not-allowed disabled:bg-cyan-100/50`}
              disabled={isLoading}
              stype="submit"
            >
              <span>Start</span>
              {isLoading ? (
                <ArrowPathIcon className="w-5 h-5 animate-spin" />
              ) : (
                <ArrowRightIcon className="w-5 h-5" />
              )}
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};
