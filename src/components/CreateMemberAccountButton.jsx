import { ArrowPathIcon } from "@heroicons/react/24/solid";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { AlertDialog, Radio } from "@radix-ui/themes";
import { useForm } from "@tanstack/react-form";
import { fetchAuthSession } from "aws-amplify/auth";
import { motion } from "framer-motion";
import { useState } from "react";
import toast from "react-hot-toast";

const CreateMemberAccountForm = ({ Cancel, customButton }) => {
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
      const idToken = authData.tokens.idToken.toString();
      console.log(obj.value);
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
              onClick={() => setIdx(i)}
            >
              <Radio
                className="!absolute !m-2 !z-30"
                name="example"
                value="1"
                size={"2"}
                checked={i == idx}
              />
              <img
                src={item.src}
                alt=""
                className="rounded-xl w-full shadow-md shadow-neutral-400"
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

const CreateMemberAccountButton = () => {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        {/* {buttonOverride ? (
          CustomButton
        ) : ( */}
        <button className="dark:bg-white bg-black dark:text-black text-white shadow-md p-2 rounded-full px-4 text-base mt-5">
          Create member account
        </button>
        {/* )} */}
      </AlertDialog.Trigger>
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
