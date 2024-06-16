import React, { useContext, useEffect, useState } from "react";
import { Panel } from "react-resizable-panels";
import Dashboard from "../components/ChatBot/Dashboard";
import { GlobalStateContext } from "../context/GlobalStateContext";
import { Alert, useAuthenticator } from "@aws-amplify/ui-react";
import { fetchAuthSession } from "aws-amplify/auth";
import { AlertDialog, Table } from "@radix-ui/themes";
import CreateMemberAccountForm from "../components/CreateMemberAccountButton";
import CreateMemberAccountButton from "../components/CreateMemberAccountButton";

const MemberAccountsTable = () => {
  const { memberAccounts, currentMemberAccount, setCurrentMemberAccount } =
    useContext(GlobalStateContext);
  const ATTRIBUTES = [
    "NO.",
    "FULL NAME",
    "EMAIL",
    "STATUS",
    "ACCOUNT ID",
    "CREATED_AT",
  ];
  const getFormattedDate = (timestamp) => {
    let date = new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  // console.log(memberAccounts.length)
  // console.log(memberAccounts.length && memberAccounts.length == 0)
  // console.log(memberAccounts);

  if (!memberAccounts) return;
  else if (memberAccounts && memberAccounts.length == 0)
    return (
      <div className="flex flex-col gap-7 items-center">
        <div className="mt-20 text-2xl font-semibold text-neutral-500">
          No member accounts found.
        </div>
        <CreateMemberAccountButton />
      </div>
    );

  return (
    <div className="w-full mx-10 bg-white dark:shadow-none shadow-lg dark:bg-neutral-800 mt-20 rounded-md pt-3 min-w-[720px]">
      {/* Tray above member accounts table  */}
      <div className="px-10 py-4 pb-6  flex justify-between items-end">
        <div className="font-semibold text-2xl">
          {memberAccounts.length} accounts
        </div>
        <div>
          <CreateMemberAccountButton
            buttonOverride
            CustomButton={
              <button className="bg-neutral-800 text-neutral-100 dark:bg-cyan-100 dark:text-black p-2 px-3 rounded-md text-base font-semibold">
                Create another account
              </button>
            }
          />
        </div>
      </div>

      <Table.Root className="border-t-[1px] dark:border-neutral-700 pb-15">
        <Table.Header>
          <Table.Row>
            {ATTRIBUTES.map((attr, i) => {
              return (
                <Table.ColumnHeaderCell
                  key={i}
                  className={`${i == 0 ? "!pl-10" : ""}`}
                >
                  {attr}
                </Table.ColumnHeaderCell>
              );
            })}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {memberAccounts.map((acc, i) => {
            return (
              <Table.Row
                onClick={() => {
                  if (acc.email != currentMemberAccount.email) {
                    setCurrentMemberAccount(acc);
                    localStorage.setItem(
                      "current_member_account",
                      JSON.stringify(acc)
                    );
                  }
                }}
                className={`dark:hover:bg-neutral-700 hover:bg-neutral-200 duration-200 ${
                  acc.email == currentMemberAccount.email
                    ? "bg-blue-300/50 hover:bg-blue-400/50 dark:bg-blue-700/30 dark:hover:bg-blue-500/30"
                    : "cursor-pointer"
                }`}
              >
                <Table.RowHeaderCell className="!font-bold !pl-10">
                  {i + 1}.
                </Table.RowHeaderCell>
                <Table.Cell>{acc.firstName + " " + acc.lastName}</Table.Cell>
                <Table.Cell>{acc.email}</Table.Cell>
                <Table.Cell>
                  <span className="dark:bg-green-600/30 bg-green-400/70 text-black dark:text-white/90 p-1 px-2 rounded-full">
                    {acc.account_status}
                  </span>
                </Table.Cell>
                <Table.Cell>{acc.account_id}</Table.Cell>
                <Table.Cell>{getFormattedDate(acc.timestamp)}</Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

const AccountFactory = () => {
  const { user } = useAuthenticator();
  fetchAuthSession();
  const {
    memberAccounts,
    currentMemberAccount,
    setMemberAccounts,
    setCurrentMemberAccount,
  } = useContext(GlobalStateContext);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!memberAccounts) {
      fetchMemberAccounts()
        .then((res) => {
          setMemberAccounts(res);
          if (localStorage.getItem("current_member_account")) {
            let ma = JSON.parse(localStorage.getItem("current_member_account"));
            if (res?.length > 0 && res.some((val) => val.email === ma.email)) {
              setCurrentMemberAccount(ma);
            } else {
              setCurrentMemberAccount(res?.length > 0 ? res[0] : null);
            }
          } else {
            setCurrentMemberAccount(res?.length > 0 ? res[0] : null);
          }
        })
        .catch((err) => {
          console.log(err);
          setError(err);
        });
    }
  }, []);

  const fetchMemberAccounts = async () => {
    // console.log("FETCHING MEMBER ACCOUNTS");

    try {
      let url =
        "https://t19tszry50.execute-api.us-east-1.amazonaws.com/prod/member-accounts";
      const result = await fetchAuthSession();
      const idToken = result.tokens.idToken.toString();
      // console.log(result);
      const response = await fetch(url, {
        method: "GET",
        headers: { Authorization: `Bearer ${idToken}` },
      });
      const response_json = await response.json();
      if (response.ok) {
        // console.log(response_json);
        return response_json;
      } else {
        // console.log(response_json);
        throw response_json;
      }
    } catch (err) {
      return err;
    }
  };

  return (
    <div className="w-full flex">
      <div className="flex-1 p-10">
        <h1 className="text-3xl font-semibold">Member accounts</h1>
        <div className="flex justify-center">
          {/* <span className="mt-10 text-neutral-500 text-lg">
            No member accounts found.
          </span> */}
          <MemberAccountsTable />
        </div>
      </div>
      {/* <div className="w-[720px]">
        <Dashboard />
      </div> */}
    </div>
  );
};

export default AccountFactory;
const memberAccounts = [
  {
    role_arn: "arn:aws:iam::730335590432:role/OrganizationAccountAccessRole",
    account_name: "advant.analytics+1user012334",
    lastName: "Ferry",
    timestamp: "2024-06-04T18:23:11.224000+00:00",
    owner: "r367708@gmail.com",
    region: "us-east-1",
    account_id: "730335590432",
    email: "advant.analytics+1user012334@gmail.com",
    firstName: "Arnoldo",
    owner_id: "f408b4e8-2031-7060-35bd-55174dc04329",
    account_status: "SUCCEEDED",
  },
  {
    role_arn: "arn:aws:iam::637423435710:role/OrganizationAccountAccessRole",
    account_name: "advant.analytics+1user022334",
    lastName: "Hagenes",
    timestamp: "2024-06-04T18:23:37.004000+00:00",
    owner: "r367708@gmail.com",
    region: "us-east-1",
    account_id: "637423435710",
    email: "advant.analytics+1user022334@gmail.com",
    firstName: "Kennith",
    owner_id: "f408b4e8-2031-7060-35bd-55174dc04329",
    account_status: "SUCCEEDED",
  },
  {
    role_arn: "arn:aws:iam::730335590432:role/OrganizationAccountAccessRole",
    account_name: "advant.analytics+1user012334",
    lastName: "Ferry",
    timestamp: "2024-06-04T18:23:11.224000+00:00",
    owner: "r367708@gmail.com",
    region: "us-east-1",
    account_id: "730335590432",
    email: "advant.analytics+1user012334@gmail.com",
    firstName: "Arnoldo",
    owner_id: "f408b4e8-2031-7060-35bd-55174dc04329",
    account_status: "SUCCEEDED",
  },
  {
    role_arn: "arn:aws:iam::637423435710:role/OrganizationAccountAccessRole",
    account_name: "advant.analytics+1user022334",
    lastName: "Hagenes",
    timestamp: "2024-06-04T18:23:37.004000+00:00",
    owner: "r367708@gmail.com",
    region: "us-east-1",
    account_id: "637423435710",
    email: "advant.analytics+1user022334@gmail.com",
    firstName: "Kennith",
    owner_id: "f408b4e8-2031-7060-35bd-55174dc04329",
    account_status: "SUCCEEDED",
  },
  {
    role_arn: "arn:aws:iam::730335590432:role/OrganizationAccountAccessRole",
    account_name: "advant.analytics+1user012334",
    lastName: "Ferry",
    timestamp: "2024-06-04T18:23:11.224000+00:00",
    owner: "r367708@gmail.com",
    region: "us-east-1",
    account_id: "730335590432",
    email: "advant.analytics+1user012334@gmail.com",
    firstName: "Arnoldo",
    owner_id: "f408b4e8-2031-7060-35bd-55174dc04329",
    account_status: "SUCCEEDED",
  },
  {
    role_arn: "arn:aws:iam::637423435710:role/OrganizationAccountAccessRole",
    account_name: "advant.analytics+1user022334",
    lastName: "Hagenes",
    timestamp: "2024-06-04T18:23:37.004000+00:00",
    owner: "r367708@gmail.com",
    region: "us-east-1",
    account_id: "637423435710",
    email: "advant.analytics+1user022334@gmail.com",
    firstName: "Kennith",
    owner_id: "f408b4e8-2031-7060-35bd-55174dc04329",
    account_status: "SUCCEEDED",
  },
  {
    role_arn: "arn:aws:iam::730335590432:role/OrganizationAccountAccessRole",
    account_name: "advant.analytics+1user012334",
    lastName: "Ferry",
    timestamp: "2024-06-04T18:23:11.224000+00:00",
    owner: "r367708@gmail.com",
    region: "us-east-1",
    account_id: "730335590432",
    email: "advant.analytics+1user012334@gmail.com",
    firstName: "Arnoldo",
    owner_id: "f408b4e8-2031-7060-35bd-55174dc04329",
    account_status: "SUCCEEDED",
  },
  {
    role_arn: "arn:aws:iam::637423435710:role/OrganizationAccountAccessRole",
    account_name: "advant.analytics+1user022334",
    lastName: "Hagenes",
    timestamp: "2024-06-04T18:23:37.004000+00:00",
    owner: "r367708@gmail.com",
    region: "us-east-1",
    account_id: "637423435710",
    email: "advant.analytics+1user022334@gmail.com",
    firstName: "Kennith",
    owner_id: "f408b4e8-2031-7060-35bd-55174dc04329",
    account_status: "SUCCEEDED",
  },
  {
    role_arn: "arn:aws:iam::730335590432:role/OrganizationAccountAccessRole",
    account_name: "advant.analytics+1user012334",
    lastName: "Ferry",
    timestamp: "2024-06-04T18:23:11.224000+00:00",
    owner: "r367708@gmail.com",
    region: "us-east-1",
    account_id: "730335590432",
    email: "advant.analytics+1user012334@gmail.com",
    firstName: "Arnoldo",
    owner_id: "f408b4e8-2031-7060-35bd-55174dc04329",
    account_status: "SUCCEEDED",
  },
  {
    role_arn: "arn:aws:iam::637423435710:role/OrganizationAccountAccessRole",
    account_name: "advant.analytics+1user022334",
    lastName: "Hagenes",
    timestamp: "2024-06-04T18:23:37.004000+00:00",
    owner: "r367708@gmail.com",
    region: "us-east-1",
    account_id: "637423435710",
    email: "advant.analytics+1user022334@gmail.com",
    firstName: "Kennith",
    owner_id: "f408b4e8-2031-7060-35bd-55174dc04329",
    account_status: "SUCCEEDED",
  },
  {
    role_arn: "arn:aws:iam::730335590432:role/OrganizationAccountAccessRole",
    account_name: "advant.analytics+1user012334",
    lastName: "Ferry",
    timestamp: "2024-06-04T18:23:11.224000+00:00",
    owner: "r367708@gmail.com",
    region: "us-east-1",
    account_id: "730335590432",
    email: "advant.analytics+1user012334@gmail.com",
    firstName: "Arnoldo",
    owner_id: "f408b4e8-2031-7060-35bd-55174dc04329",
    account_status: "SUCCEEDED",
  },
  {
    role_arn: "arn:aws:iam::637423435710:role/OrganizationAccountAccessRole",
    account_name: "advant.analytics+1user022334",
    lastName: "Hagenes",
    timestamp: "2024-06-04T18:23:37.004000+00:00",
    owner: "r367708@gmail.com",
    region: "us-east-1",
    account_id: "637423435710",
    email: "advant.analytics+1user022334@gmail.com",
    firstName: "Kennith",
    owner_id: "f408b4e8-2031-7060-35bd-55174dc04329",
    account_status: "SUCCEEDED",
  },
];
