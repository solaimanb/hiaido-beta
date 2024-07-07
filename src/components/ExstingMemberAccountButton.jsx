import { AlertDialog, Radio } from "@radix-ui/themes";
import AnimatedBtn from "./Buttons/AnimatedBtn";

const ExstingMemberAccountButton = () => {
    return (
        <AlertDialog.Root>
            <AlertDialog.Trigger className="flex justify-center w-full">
                <AnimatedBtn type="button" additionalClasses={'px-2 mt-3 w-xl'}>Connect</AnimatedBtn>
            </AlertDialog.Trigger>
            <AlertDialog.Content className="!h-fit">
                <AlertDialog.Title>
                    <div className="w-full text-2xl p-2">Exsting Member Account</div>
                </AlertDialog.Title>
                <AlertDialog.Cancel>
                    <button color="orange" className="">
                        Cancel
                    </button>
                </AlertDialog.Cancel>
            </AlertDialog.Content>
        </AlertDialog.Root>
    );
};

export default ExstingMemberAccountButton;