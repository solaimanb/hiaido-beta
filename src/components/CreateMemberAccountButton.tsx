import React, { useState } from "react";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { AlertDialog, Radio } from "@radix-ui/themes";
import { useForm } from "@tanstack/react-form";
import { fetchAuthSession } from "aws-amplify/auth";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useGlobalState } from "@/context/GlobalStateContext";
import Loading from "./shared/Loading";

const CreateMemberAccountForm: React.FC<any> = ({ Cancel, customButton }) => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
    onSubmit: async (obj) => {
      setIsLoading(true);
      const authData = await fetchAuthSession();
      // TODO: does not work for google and facebook
      const idToken = authData.tokens?.idToken?.toString();
      // console.log(obj.value);
      const response = await fetch(
        "https://t19tszry50.execute-api.us-east-1.amazonaws.com/prod/create",
        {
          method: "POST",
          body: JSON.stringify(obj.value),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`,
          },
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
        setTimeout(() => {
          window.location.reload();
        }, 500);
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

  return (
    <motion.div className="h-full my-10 px-3">
      <div className="grid grid-cols-5 gap-5 pb-5">
        {data.map((item, i) => {
          return (
            <div
              key={i}
              className="relative aspect-square col-span-1 rounded-md hover:scale-[1.02] hover:invert-[.1] duration-300 delay-100"
              style={{ cursor: item.disabled ? "not-allowed" : "pointer" }}
              onClick={() => item.disabled || setIdx(i)}
            >
              <Radio
                className="!absolute !m-2 !z-30"
                name="example"
                value="1"
                disabled={item.disabled}
                size={"2"}
                checked={i == idx}
              />
              <img
                src={item.src}
                alt=""
                className="rounded-xl w-full shadow-md shadow-neutral-400 dark:shadow-none"
                // gray out if disabled
                style={{ filter: item.disabled ? "grayscale(100%)" : "" }}
              />
            </div>
          );
        })}
      </div>
      <div className="h-[1px] dark:bg-neutral-700 bg-neutral-400 w-full"></div>
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
          <div className="col-span-1 w-full">
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
                  <div className="text-red-500 h-3 text-sm">
                    {field.state.meta.errors.length > 0 &&
                      field.state.meta.errors[0]}
                  </div>
                </>
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
                    className="appearance-none outline-none focus:ring-offset-green-700 w-full rounded-md p-3 dark:bg-neutral-700/50 border-[1px] border-neutral-300 dark:border-neutral-600 shadow-md dark:shadow-none"
                    placeholder="Email"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <div className="text-red-500 h-3 text-sm">
                    {field.state.meta.errors.length > 0 &&
                      field.state.meta.errors[0]}
                  </div>
                </>
              )}
            />
          </div>
          <div className="flex relative justify-end w-full col-span-2 space-x-3">
            <Cancel>
              <button className="bg-black text-white px-3 rounded-lg hover:bg-neutral-800">
                Cancel
              </button>
            </Cancel>
            <button
              className={`dark:bg-cyan-100 bg-cyan-200 z-[100] text-black p-3 px-5 rounded-lg space-x-3 w-fit flex items-center disabled:cursor-not-allowed disabled:bg-cyan-100/50 hover:bg-cyan-300 `}
              disabled={isLoading}
              type="submit"
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

const data = [
  {
    label: "AWS",
    src: "https://pbs.twimg.com/profile_images/1641476962362302464/K8lb6OtN_400x400.jpg",
    disabled: false,
  },
  {
    label: "GCP",
    src: "https://pendulum-it.com/wp-content/uploads/2020/05/Google-Cloud-Platform-GCP-logo.png",
    disabled: true,
  },
  {
    label: "Azure",
    src: "https://i.pinimg.com/564x/85/d5/7e/85d57e14f76a63b4657020779e85dfd7.jpg",
    disabled: true,
  },
];

const CreateMemberAccountButton: React.FC<{}> = ({}) => {
  const { memberAccounts, subscription } = useGlobalState();
  if (!subscription || !memberAccounts) {
    return <Loading />;
  }
  let disabled = false;
  let disableMessage = "";

  if (subscription.plan === "PLAYGROUND") {
    if (
      memberAccounts.memberAccounts.length > 0 ||
      memberAccounts.connectedAccounts.length > 0
    ) {
      disabled = true;
      disableMessage = "Upgrade your plan to create more member accounts.";
    }
  }
  return (
    <AlertDialog.Root>
      {disabled ? (
        <button
          id="animated-btn-outlined"
          className="!shadow-none px-4 p-2"
          onClick={() => {
            toast.error("Upgrade your plan to create more member accounts.");
          }}
        >
          Create member account
        </button>
      ) : (
        <AlertDialog.Trigger>
          {/* {buttonOverride ? (
          CustomButton
          ) : ( */}
          <button
            className="px-4 p-2"
            id="animated-btn-outlined"
            // className={` dark:bg-white bg-black shadow-orange-400 dark:text-black text-orange-400 shadow p-2 rounded-full px-4 text-base mt-5 ${className}`}
          >
            Create member account
          </button>
          {/* )} */}
        </AlertDialog.Trigger>
      )}
      <AlertDialog.Content className="!h-fit">
        <AlertDialog.Title>
          <div className="w-full text-2xl p-2">Create Member Account</div>
        </AlertDialog.Title>
        <CreateMemberAccountForm Cancel={AlertDialog.Cancel} />
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default CreateMemberAccountButton;
