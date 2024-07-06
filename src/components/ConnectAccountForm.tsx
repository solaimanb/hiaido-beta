import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/ui-components/ui/alert-dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/ui-components/ui/form";
import { Input } from "@/ui-components/ui/input";
import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/ui-components/ui/button";
import { fetchAuthSession } from "aws-amplify/auth";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { CircleHelp, Copy, Loader2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/ui-components/ui/tooltip";
import HelpVideoAWSButton from "./HelpVideoAWSButton";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/ui-components/ui/popover";

const formSchema = z.object({
  alias: z
    .string({ message: "Account alias is required" })
    .min(4, "Role ARN is too short")
    .max(20, "Role ARN is too long"),
  roleArn: z
    .string({ message: "Role ARN is required" })
    .refine(
      (value) => {
        return value.split(":").length === 6;
      },
      { message: "Invalid ARN!" }
    )
    .refine(
      (value) => {
        return value.startsWith("arn:aws:iam::");
      },
      { message: "Role ARN must start with 'arn:aws:iam::'" }
    ),
});

const copyContent = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    alert("Failed to copy " + err);
  }
};

type ConnectAccountFormData = z.infer<typeof formSchema>;

const ConnectAccountForm = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [externalId, setExternalId] = useState<string | null>(null);
  // const [loadingExternalId, setLoadingExternalId] = useState(false);
  const navigate = useNavigate();
  const HIAIDO_ACCOUNT_ID = "381492248344";

  const handleExternalIdGeneration = async () => {
    if (externalId) return;
    const authData = await fetchAuthSession();
    const idToken = authData.tokens?.idToken?.toString();

    // setLoadingExternalId(true);

    try {
      const response = await fetch(
        "https://t19tszry50.execute-api.us-east-1.amazonaws.com/prod/connect-account/external-id",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`,
          },
        }
      );

      const res_body = await response.json();
      if (response.ok) {
        setExternalId(res_body.externalId);
        // toast.success("External Id generated successfully");
      } else {
        setErrorMessage(res_body.message || "An error occured");
        toast.error(res_body.message || "An error occured");
      }
    } catch (err) {
      console.log(err);
      toast.error("An error occured");
      setErrorMessage("An error occured");
    } finally {
      // setLoadingExternalId(false);
    }
  };

  useEffect(() => {
    handleExternalIdGeneration();
  }, []);

  const form = useForm<ConnectAccountFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  const onSubmit = async (values: ConnectAccountFormData) => {
    const { alias, roleArn } = values;
    console.log("Hello");
    if (loading) return;
    // validate input
    if (externalId === null) {
      setErrorMessage("External Id is required");
      return;
    }

    const authData = await fetchAuthSession();
    const idToken = authData.tokens?.idToken?.toString();

    try {
      setLoading(true);
      const response = await fetch(
        "https://t19tszry50.execute-api.us-east-1.amazonaws.com/prod/connect-account",
        {
          method: "POST",
          body: JSON.stringify({
            role_arn: roleArn,
            externalId,
            alias,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`,
          },
        }
      );

      const res_body = await response.json();
      if (response.ok) {
        toast.success("Account connected successfully");
        setTimeout(() => {
          // navigate("/chat");
          window.location.reload();
        }, 1000);
      } else {
        setErrorMessage(res_body.message || "An error occured");
        toast.error(res_body.message || "An error occured");
      }
    } catch (err) {
      console.log(err);
      toast.error("An error occured");
      setErrorMessage("An error occured");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AlertDialogHeader>
        <AlertDialogTitle className="flex justify-between items-center">
          Connect existing AWS account
          <span className="flex items-center !text-base !font-normal">
            Help
            <HelpVideoAWSButton />
          </span>
        </AlertDialogTitle>
      </AlertDialogHeader>
      {/* <AlertDialogDescription> */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          onChange={() => setErrorMessage(null)}
          className="grid gap-3"
        >
          <div className="grid grid-cols-2 gap-2 mb-10">
            {/* <FormField
              control={form.control}
              name=""
              render={({ field }) => ( */}
            <FormItem>
              <FormLabel
                onClick={async (e) => {
                  e.preventDefault();
                  await copyContent("381492248344");
                  toast.success("Hiaido Account Id Copied!", {
                    id: "copyaccid",
                  });
                }}
              >
                Hiaido Account ID
                <Copy className="size-4 ml-2 inline-block cursor-pointer" />
              </FormLabel>
              <FormControl>
                <Input
                  value={HIAIDO_ACCOUNT_ID}
                  // disabled
                />
              </FormControl>
              <FormMessage />
            </FormItem>
            {/* )} */}
            {/* /> */}
            {/* <FormField
              control={form.control}
              name="alias"
              render={({ field }) => {
                return  */}
            {externalId === null ? (
              <FormItem>
                <FormLabel>
                  Generating External ID
                  <Loader2 className="size-4 ml-2 inline-block cursor-pointer animate-spin" />
                </FormLabel>
                <FormControl>
                  <Input className="animate-pulse bg-neutral-800" />
                </FormControl>
                <FormMessage />
              </FormItem>
            ) : (
              <FormItem>
                <FormLabel
                  onClick={async (e) => {
                    e.preventDefault();
                    await copyContent(externalId);
                    toast.success("External Id Copied!", {
                      id: "copyextid",
                    });
                  }}
                >
                  External ID
                  <Copy className="size-4 ml-2 inline-block cursor-pointer" />
                </FormLabel>
                <FormControl>
                  <Input
                    // disabled
                    value={externalId}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            {/* /> */}
          </div>
          <FormField
            control={form.control}
            name="alias"
            render={({ field }) => (
              <FormItem>
                <Popover>
                  <FormLabel>Account alias</FormLabel>
                  <PopoverTrigger asChild>
                    <CircleHelp className="inline-block ml-2 mb-2 -translate-y-1 size-4" />
                  </PopoverTrigger>
                  <PopoverContent className="bg-neutral-800">
                    <p className="w-64">
                      A unique alias to identify the connected account.
                    </p>
                  </PopoverContent>
                </Popover>
                <FormControl>
                  <Input placeholder="Enter account alias" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="roleArn"
            render={({ field }) => (
              <FormItem>
                <Popover>
                  <FormLabel>Role ARN</FormLabel>
                  <PopoverTrigger asChild>
                    <CircleHelp className="inline-block ml-2 mb-2 -translate-y-1 size-4" />
                  </PopoverTrigger>
                  <PopoverContent className="bg-neutral-800">
                    <p className="w-64">
                      The ARN or the role generated using the provided Hiaido
                      Account ID and External Id provided
                    </p>
                  </PopoverContent>
                </Popover>
                <FormControl>
                  <Input placeholder="Enter Role ARN" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {errorMessage && (
            <p className="text-red-500 text-sm">{errorMessage}</p>
          )}
          <AlertDialogFooter className="mt-10">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button disabled={loading} type="submit">
              Connect
            </Button>
          </AlertDialogFooter>
        </form>
        <Toaster />
      </Form>
      {/* </AlertDialogDescription> */}
    </>
  );
};

export default ConnectAccountForm;
