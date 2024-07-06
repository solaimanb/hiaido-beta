import dummy from "../assets/dummy.mp4";
// import Dialog from "./Dialog";
import { useState } from "react";
import InformationCircleIcon from "../assets/icons/informationIcon.svg";
import JsonViewer from "./JsonViewer";
import { CopyIcon } from "@radix-ui/react-icons";
import toast from "react-hot-toast";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger,
} from "@/ui-components/ui/alert-dialog";

const HelpVideoAWSButton = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  const copyContent = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard");
    } catch (err) {
      alert("Failed to copy", err);
    }
  };

  return (
    <>
      <AlertDialog
        isOpen={isDialogOpen}
        onClose={closeDialog}
        title={"How to create the account in AWS."}
      >
        <AlertDialogTrigger>
          <button className="p-2 rounded" onClick={openDialog}>
            <img src={InformationCircleIcon} width={24} height={24} />
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <div className="w-full flex gap-4 flex-col items-center md:flex-row">
            <video controls autoPlay={true} className="w-full">
              <source src={dummy} type="video/mp4" />
            </video>
            {/* <div className="w-full text-black relative">

                        <JsonViewer className={""} data={{
                            "Version": "2012-10-17",
                            "Statement": [
                                {
                                    "Sid": "Statement1",
                                    "Effect": "Allow",
                                    "Principal": {
                                        "AWS": "arn:aws:iam::381492248344:role/hiaido-admin-role"
                                    },
                                    "Action": "sts:AssumeRole"
                                }
                            ]
                        }} level={1} />
                        <button className="flex items-center gap-2 border rounded-md p-2 absolute bottom-0 right-0"
                            onClick={async () => {
                                await copyContent(JSON.stringify({
                                    "Version": "2012-10-17",
                                    "Statement": [
                                        {
                                            "Sid": "Statement1",
                                            "Effect": "Allow",
                                            "Principal": {
                                                "AWS": "arn:aws:iam::381492248344:role/hiaido-admin-role"
                                            },
                                            "Action": "sts:AssumeRole"
                                        }
                                    ]
                                }));
                            }}>
                            <div>Copy</div>
                            <CopyIcon
                                className="cursor-pointer"

                            />
                        </button>

                    </div> */}
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* <AlertDialog.Root>
                <AlertDialog.Trigger className="flex justify-center">
                    <button>
                        <img src={InformationCircleIcon} width={24} height={24} />
                    </button>
                </AlertDialog.Trigger>
                <AlertDialog.Content className="!h-fit w-full" width={100}>
                    <AlertDialog.Title>
                        <div className="w-full text-2xl p-2">How to create the account in AWS.</div>
                    </AlertDialog.Title>

                    <AlertDialog.Cancel>
                        <button color="orange" className="p-3 border border-orange-400 rounded-3xl bg-orange-300 hover:bg-orange-400 mt-3 font-bold">
                            Cancel
                        </button>
                    </AlertDialog.Cancel>
                </AlertDialog.Content>
            </AlertDialog.Root> */}
    </>
  );
};

export default HelpVideoAWSButton;
