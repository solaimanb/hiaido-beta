import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/ui-components/ui/alert-dialog";
import ConnectAccountForm from "./ConnectAccountForm";
import { Button } from "@/ui-components/ui/button";
import AnimatedBtn from "./Buttons/AnimatedBtn";

const ConnectAccountFormButton = () => {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <button id="animated-btn" className="p-2 px-4">
          Connect account
        </button>
        {/* <Button className="rounded-full bg-gradient-to-r from-yellow-500 via-orange-500 to-red-600">Connect Account</Button> */}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <ConnectAccountForm />
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConnectAccountFormButton;
