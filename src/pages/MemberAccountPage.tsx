import CreateMemberAccountButton from "@/components/CreateMemberAccountButton";
import ExstingMemberAccountButton from "@/components/ExstingMemberAccountButton";
import HelpVideoAWSButton from "@/components/HelpVideoAWSButton";
import OrDevider from "@/components/OrDevider";
import { CopyIcon } from "@radix-ui/react-icons";
import { Helmet } from "react-helmet-async";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { Loader2, VerifiedIcon } from "lucide-react";
import AnimatedBtn from "../components/Buttons/AnimatedBtn";
import { Button } from "@/ui-components/ui/button";
import ConnectAccountFormButton from "@/components/ConnectAccountFormButton";
import { fetchAuthSession } from "aws-amplify/auth";
import Loader from "@/components/Loader";
import { useGlobalState } from "@/context/GlobalStateContext";

const copyContent = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    alert("Failed to copy " + err);
  }
};

const ConnectExstingMemberAccountForm: React.FC<{ disabled?: boolean }> = ({
  disabled = false,
}) => {
  const [roleARN, setRoleARN] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [externalId, setExternalId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingExternalId, setLoadingExternalId] = useState(false);
  const navigate = useNavigate();

  // const handleExternalIdGeneration = async () => {
  //   if (loadingExternalId) return;
  //   const authData = await fetchAuthSession();
  //   const idToken = authData.tokens?.idToken?.toString();

  //   setLoadingExternalId(true);

  //   try {
  //     const response = await fetch(
  //       "https://t19tszry50.execute-api.us-east-1.amazonaws.com/prod/connect-account/external-id",
  //       {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${idToken}`,
  //         },
  //       }
  //     );

  //     const res_body = await response.json();
  //     if (response.ok) {
  //       setExternalId(res_body.externalId);
  //       toast.success("External Id generated successfully");
  //     } else {
  //       setErrorMsg(res_body.message || "An error occured");
  //       toast.error(res_body.message || "An error occured");
  //     }
  //   } catch (err) {
  //     console.log(err);
  //     toast.error("An error occured");
  //     setErrorMsg("An error occured");
  //   } finally {
  //     setLoadingExternalId(false);
  //   }
  // };

  // const submitRoleArn = async () => {
  //   if (loading) return;
  //   // validate input
  //   if (externalId === null) {
  //     setErrorMsg("External Id is required");
  //     return;
  //   }
  //   if (roleARN.split(":").length !== 6) {
  //     setErrorMsg("Invalid ARN");
  //     return;
  //   }

  //   const authData = await fetchAuthSession();
  //   const idToken = authData.tokens?.idToken?.toString();

  //   try {
  //     setLoading(true);
  //     const response = await fetch(
  //       "https://t19tszry50.execute-api.us-east-1.amazonaws.com/prod/connect-account",
  //       {
  //         method: "POST",
  //         body: JSON.stringify({
  //           role_arn: roleARN,
  //           externalId,
  //         }),
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${idToken}`,
  //         },
  //       }
  //     );

  //     const res_body = await response.json();
  //     if (response.ok) {
  //       toast.success("Account connected successfully");
  //       navigate("/chat");
  //     } else {
  //       setErrorMsg(res_body.message || "An error occured");
  //       toast.error(res_body.message || "An error occured");
  //     }
  //   } catch (err) {
  //     console.log(err);
  //     toast.error("An error occured");
  //     setErrorMsg("An error occured");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <div className="w-full h-full p-2 md:border-l md:pl-4">
      <h2 className="font-bold text-2xl text-nowrap">Already have AWS?</h2>
      <p className="my-10 mt-5 text-lg">
        Link your existing account to manage resources seamlessly.
      </p>

      {/* <div className="mt-5 w-full flex justify-center">
        <input
          type="text"
          name="role"
          id="role"
          placeholder="Enter Role ARN"
          className=" p-2 rounded-lg text-white bg-neutral-800"
          onChange={(e) => {
            setRoleARN(e.target.value);
            setErrorMsg(null);
          }}
        />
      </div> */}
      {/* <div className="text-left text-red-400 mt-3 text-sm">{errorMsg}</div> */}
      {/* <ExstingMemberAccountButton disabled={!roleARN.length} /> */}
      {/* <Button onClick={submitRoleArn}>Connect</Button> */}
      <ConnectAccountFormButton />
    </div>
  );
};

const MemberAccountPage = () => {
  const [showCopied, setShowCopied] = useState(false);
  const [searchParams, setSearchParam] = useSearchParams();
  const { subscription } = useGlobalState();

  console.log(subscription);

  const hostedPageId = searchParams.get("id");
  const state = searchParams.get("state");
  window.scrollTo(0, 0);

  useEffect(() => {
    if (!hostedPageId) {
      // TODO: fetch redirect url from backend
      return;
    }
  }, []);

  useEffect(() => {
    if (showCopied) {
      setTimeout(() => {
        setShowCopied(false);
      }, 2000);
    }
  }, [showCopied]);

  if (subscription === null) {
    return <Loader />;
  }

  return (
    <>
      <Helmet>
        <title>
          Hiaido | AI Powered Cloud Automation Platform | Seamlessly automate
          tasks, optimize resources, and drive efficiency for your business.
        </title>
        <meta
          name="description"
          content="HIAIDO is your intelligent cloud assistant, enabling you to effortlessly manage your cloud operations through natural language commands."
        />
        <meta
          name="keywords"
          content="Cloud, Automation, AI, Operations, India, Cloud Operations, Cloud Automation, AI Platform, Task Automation, Efficiency, Scalability, Cloud Infrastructure, Cloud Services, Cloud Computing"
        />
        <meta name="author" content="Hiaido" />
      </Helmet>
      {/* <div className='w-full'>
                <div> help</div>
                <HelpVideoAWSButton />
            </div> */}
      <div className="h-full md:w-[720px] overflow-auto flex justify-center items-center p-3">
        <div className="p-9 w-fit rounded-lg text-center border border-orange-300 ">
          {subscription ? (
            <>
              <div className="w-full flex gap-2 mb-3 pb-3 justify-end items-center">
                <div>Help</div>
                <HelpVideoAWSButton />
              </div>
              <div className="w-full flex flex-col md:flex-row gap-6 md:gap-0 items-center">
                <div className="w-full p-2">
                  <h2 className="font-bold text-2xl">New to AWS?</h2>
                  <p className="w-full max-w-md my-10 mt-5 text-lg">
                    Easy sign up for a new AWS account to explore cloud
                    solutions
                  </p>
                  <CreateMemberAccountButton />
                </div>
                {/* <hr className='my-5' /> */}
                {/* {subscription.plan === "PLAYGROUND" || (
                  <> */}
                <OrDevider className={"py-5 w-full block md:hidden"} />{" "}
                <div className="translate-x-3 hidden md:block font-bold bg-black">
                  OR
                </div>
                <ConnectExstingMemberAccountForm
                  disabled={subscription.plan === "PLAYGROUND"}
                />
                {/* </>
                )} */}
              </div>
            </>
          ) : (
            <div className="w-full">Please complete the payment first</div>
          )}
        </div>
      </div>
    </>
  );
};

export default MemberAccountPage;
