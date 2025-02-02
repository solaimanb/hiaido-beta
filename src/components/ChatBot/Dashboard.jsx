import { useState } from "react";
import {
  ArrowRightIcon,
  CubeIcon,
  GlobeIcon,
  UploadIcon,
} from "@radix-ui/react-icons";
import { DropdownMenu, Button, Radio } from "@radix-ui/themes";
import { motion } from "framer-motion";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { useForm } from "@tanstack/react-form";
import toast from "react-hot-toast";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import AnimatedMenuBar from "../shared/AnimatedMenuBar";

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
      <div className="pr-15 border-l-[1px] dark:border-neutral-700/85 border-neutral-400 pl-10">
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
      icon: <GlobeIcon className="w-5 h-5 mx-2" />,
      content: <SkySection />,
    },
    {
      label: "Resources",
      icon: <CubeIcon className="w-5 h-5 mx-2" />,
      content: "Manage your resources",
    },
    {
      label: "Deployments",
      icon: <UploadIcon className="w-5 h-5 mx-2" />,
      content: "Manage all your deployments from one place",
    },
  ];

  return (
    <div className="space-y-4">
      <AnimatedMenuBar
        menuData={data}
        activeTabIndex={activeTabIndex}
        setActiveTabIndex={setActiveTabIndex}
      />
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
      src: "https://customcodefactory.com/wp-content/uploads/2019/12/aws-app-icon-300x300.jpg",
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
              key={i}
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
              <img src={item.src} alt="" className="rounded-xl w-full shadow-md shadow-neutral-400" />
            </div>
          );
        })}
      </div>
      <div className="h-[1px] dark:bg-neutral-700 bg-neutral-400 w-full"></div>
      <div className="w-full">
        <form
          className="relative grid grid-cols-2 gap-3 py-5"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <div className="w-full col-span-1">
            <form.Field
              name="firstName"
              validators={{
                onChange({ value }) {
                  return value.trim() === ""
                    ? "First name cannot be empty"
                    : undefined;
                },
              }}
              children={(field) => (
                <>
                  <input
                    name={field.name}
                    className="appearance-none outline-none focus:ring-offset-green-700 w-full rounded-md p-3 dark:bg-neutral-700/50 border-[1px] border-neutral-300 dark:border-neutral-600 shadow-md dark:shadow-none"
                    placeholder="First name"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <div className="dark:text-red-500 text-red-600 h-3 text-sm">
                    {field.state.meta.errors.length > 0 &&
                      field.state.meta.errors[0]}
                  </div>
                </>
              )}
            />
          </div>

          <div className="w-full col-span-1">
            <form.Field
              name="lastName"
              validators={{
                onChange({ value }) {
                  return value.trim() === ""
                    ? "Last name cannot be empty"
                    : undefined;
                },
              }}
              children={(field) => (
                <>
                  <input
                    name={field.name}
                    className="appearance-none outline-none focus:ring-offset-green-700 w-full rounded-md p-3 dark:bg-neutral-700/50 border-[1px] border-neutral-300 dark:border-neutral-600 shadow-md dark:shadow-none"
                    placeholder="Last name"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <div className="h-3 text-sm text-red-500">
                    {field.state.meta.errors.length > 0 &&
                      field.state.meta.errors[0]}
                  </div>
                </>
              )}
            />
          </div>
          <div className="w-full col-span-2">
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
                    className="appearance-none outline-none focus:ring-offset-green-700 w-full rounded-md p-3 dark:bg-neutral-700/50 border-[1px] border-neutral-300 dark:border-neutral-600 shadow-md dark:shadow-none"
                    placeholder="Email"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <div className="h-3 text-sm text-red-500">
                    {field.state.meta.errors.length > 0 &&
                      field.state.meta.errors[0]}
                  </div>
                </>
              )}
            />
          </div>
          <div className="relative flex justify-end w-full col-span-2">
            <button
              className={`dark:bg-cyan-100 bg-cyan-200 z-[100] text-black p-3 px-5 rounded-lg space-x-3 w-fit flex items-center disabled:cursor-not-allowed absolute disabled:bg-cyan-100/50 hover:scale-105 duration-200 ease-in delay-75`}
              disabled={isLoading}
              stype="submit"
            >
              <span>Start</span>
              {isLoading ? (
                <ArrowPathIcon className="animate-spin w-5 h-5" />
              ) : (
                <ArrowRightIcon className="w-5 h-5" />
              )}
            </button>
            {/* <div className="bg-gradient-to-tr from-red-500 z-0 to-pink-500 rounded-lg absolute w-fit p-3 px-5 space-x-3 flex items-center blur-[7px]">
              <span>Start</span>
              {isLoading ? (
                <ArrowPathIcon className="animate-spin w-5 h-5" />
              ) : (
                <ArrowRightIcon className="w-5 h-5" />
              )}
            </div> */}
          </div>
        </form>
      </div>
    </motion.div>
  );
};
