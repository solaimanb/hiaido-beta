import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/ui-components/ui/alert-dialog";
import ConnectAccountForm from "./ConnectAccountForm";
import { Button } from "@/ui-components/ui/button";

const ConnectAccountFormButton = () => {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button className="rounded-full">Connect Account</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <ConnectAccountForm />
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConnectAccountFormButton;
