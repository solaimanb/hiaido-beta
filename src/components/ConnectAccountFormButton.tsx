import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/ui-components/ui/alert-dialog";
import ConnectAccountForm from "./ConnectAccountForm";
import "./Buttons/AnimatedBtn.css";
import { Button } from "@/ui-components/ui/button";
import AnimatedBtn from "./Buttons/AnimatedBtn";
import React from "react";
import toast from "react-hot-toast";
import { useGlobalState } from "@/context/GlobalStateContext";
import Loading from "./shared/Loading";

const ConnectAccountFormButton: React.FC<{}> = ({}) => {
  const { memberAccounts, subscription } = useGlobalState();
  if (!subscription || !memberAccounts) {
    return <Loading />;
  }
  let disabled = false;
  let disableMessage = "";

  // if (subscription.plan === "PLAYGROUND") {
  //   if (
  //     memberAccounts.memberAccounts.length > 0 ||
  //     memberAccounts.connectedAccounts.length > 0
  //   ) {
  //     disabled = true;
  //     disableMessage =
  //       "Exclusive for Elite Members. Upgrade to our Elite plan to connect your existing AWS accounts.";
  //   }
  // } else if (subscription.plan === "STARTER") {
  //   disabled = true;
  //   disableMessage =
  //     "Exclusive for Elite Members. Upgrade to our Elite plan to connect your existing AWS accounts.";
  // }
  return (
    <AlertDialog>
      {disabled ? (
        <button
          id="animated-btn"
          onClick={() => {
            toast.error(disableMessage);
          }}
          className="p-2 px-4"
        >
          Connect account
        </button>
      ) : (
        <AlertDialogTrigger>
          <button id="animated-btn" className="p-2 px-4">
            Connect account
          </button>
        </AlertDialogTrigger>
      )}
      {/* <Button className="rounded-full bg-gradient-to-r from-yellow-500 via-orange-500 to-red-600">Connect Account</Button> */}
      <AlertDialogContent>
        <ConnectAccountForm />
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConnectAccountFormButton;
