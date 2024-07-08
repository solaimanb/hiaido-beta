import { useContext, useState } from "react";
import { Table } from "@radix-ui/themes";
import CreateMemberAccountButton from "../components/CreateMemberAccountButton";
import { GlobalStateContext } from "@/context/GlobalStateContext";
import { Helmet } from "react-helmet-async";

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
  const getFormattedDate = (timestamp: string) => {
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
  else if (
    memberAccounts &&
    memberAccounts.memberAccounts.length == 0 &&
    memberAccounts.connectedAccounts.length === 0
  )
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
          {memberAccounts.memberAccounts.length} accounts
        </div>
        <div>
          <CreateMemberAccountButton />
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
          {memberAccounts.memberAccounts.map((acc, i) => {
            return (
              <Table.Row
                key={i}
                onClick={() => {
                  if (acc.email != currentMemberAccount?.email) {
                    setCurrentMemberAccount(acc);
                    localStorage.setItem(
                      "current_member_account",
                      JSON.stringify(acc)
                    );
                  }
                }}
                className={`dark:hover:bg-neutral-700 hover:bg-neutral-200 duration-200 ${
                  acc.email == currentMemberAccount?.email
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
  const {
    memberAccounts,
    currentMemberAccount,
    setMemberAccounts,
    setCurrentMemberAccount,
  } = useContext(GlobalStateContext);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   if (!memberAccounts) {
  //     fetchMemberAccounts()
  //       .then((res) => {
  //         setMemberAccounts(res);
  //         let cma = localStorage.getItem("current_member_account");
  //         if (cma) {
  //           let cmaObj: MemberAccount = JSON.parse(cma);
  //           if (
  //             res?.length > 0 &&
  //             res.some((val) => val.email === cmaObj.email)
  //           ) {
  //             setCurrentMemberAccount(cmaObj);
  //           } else {
  //             setCurrentMemberAccount(res?.length > 0 ? res[0] : null);
  //           }
  //         } else {
  //           setCurrentMemberAccount(res?.length > 0 ? res[0] : null);
  //         }
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         setError(err);
  //       });
  //   }
  // }, []);

  // const fetchMemberAccounts: () => Promise<MemberAccount[]> = async () => {
  //   // console.log("FETCHING MEMBER ACCOUNTS");

  //   try {
  //     let url =
  //       "https://t19tszry50.execute-api.us-east-1.amazonaws.com/prod/member-accounts";
  //     const result = await fetchAuthSession();
  //     // TODO: does not work for google and facebook
  //     // TODO: fix
  //     console.log(result.tokens);
  //     const idToken = result.tokens?.idToken?.toString();
  //     // console.log(result);
  //     const response = await fetch(url, {
  //       method: "GET",
  //       headers: { Authorization: `Bearer ${idToken}` },
  //     });
  //     const response_json = await response.json();
  //     console.log(response_json);
  //     if (response.ok) {
  //       return response_json;
  //     } else {
  //       throw response_json;
  //     }
  //   } catch (err) {
  //     return err;
  //   }
  // };

  return (
    <>
      <Helmet>
        <title>Hiaido | Account Factory</title>
      </Helmet>
      <div className="w-full flex">
        <div className="flex-1 p-10">
          <h1 className="text-3xl font-semibold">Member accounts</h1>
          <div className="flex justify-center">
            <MemberAccountsTable />
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountFactory;
// const memberAccounts = [
//   {
//     role_arn: "arn:aws:iam::730335590432:role/OrganizationAccountAccessRole",
//     account_name: "advant.analytics+1user012334",
//     lastName: "Ferry",
//     timestamp: "2024-06-04T18:23:11.224000+00:00",
//     owner: "r367708@gmail.com",
//     region: "us-east-1",
//     account_id: "730335590432",
//     email: "advant.analytics+1user012334@gmail.com",
//     firstName: "Arnoldo",
//     owner_id: "f408b4e8-2031-7060-35bd-55174dc04329",
//     account_status: "SUCCEEDED",
//   },
//   {
//     role_arn: "arn:aws:iam::637423435710:role/OrganizationAccountAccessRole",
//     account_name: "advant.analytics+1user022334",
//     lastName: "Hagenes",
//     timestamp: "2024-06-04T18:23:37.004000+00:00",
//     owner: "r367708@gmail.com",
//     region: "us-east-1",
//     account_id: "637423435710",
//     email: "advant.analytics+1user022334@gmail.com",
//     firstName: "Kennith",
//     owner_id: "f408b4e8-2031-7060-35bd-55174dc04329",
//     account_status: "SUCCEEDED",
//   },
//   {
//     role_arn: "arn:aws:iam::730335590432:role/OrganizationAccountAccessRole",
//     account_name: "advant.analytics+1user012334",
//     lastName: "Ferry",
//     timestamp: "2024-06-04T18:23:11.224000+00:00",
//     owner: "r367708@gmail.com",
//     region: "us-east-1",
//     account_id: "730335590432",
//     email: "advant.analytics+1user012334@gmail.com",
//     firstName: "Arnoldo",
//     owner_id: "f408b4e8-2031-7060-35bd-55174dc04329",
//     account_status: "SUCCEEDED",
//   },
//   {
//     role_arn: "arn:aws:iam::637423435710:role/OrganizationAccountAccessRole",
//     account_name: "advant.analytics+1user022334",
//     lastName: "Hagenes",
//     timestamp: "2024-06-04T18:23:37.004000+00:00",
//     owner: "r367708@gmail.com",
//     region: "us-east-1",
//     account_id: "637423435710",
//     email: "advant.analytics+1user022334@gmail.com",
//     firstName: "Kennith",
//     owner_id: "f408b4e8-2031-7060-35bd-55174dc04329",
//     account_status: "SUCCEEDED",
//   },
//   {
//     role_arn: "arn:aws:iam::730335590432:role/OrganizationAccountAccessRole",
//     account_name: "advant.analytics+1user012334",
//     lastName: "Ferry",
//     timestamp: "2024-06-04T18:23:11.224000+00:00",
//     owner: "r367708@gmail.com",
//     region: "us-east-1",
//     account_id: "730335590432",
//     email: "advant.analytics+1user012334@gmail.com",
//     firstName: "Arnoldo",
//     owner_id: "f408b4e8-2031-7060-35bd-55174dc04329",
//     account_status: "SUCCEEDED",
//   },
//   {
//     role_arn: "arn:aws:iam::637423435710:role/OrganizationAccountAccessRole",
//     account_name: "advant.analytics+1user022334",
//     lastName: "Hagenes",
//     timestamp: "2024-06-04T18:23:37.004000+00:00",
//     owner: "r367708@gmail.com",
//     region: "us-east-1",
//     account_id: "637423435710",
//     email: "advant.analytics+1user022334@gmail.com",
//     firstName: "Kennith",
//     owner_id: "f408b4e8-2031-7060-35bd-55174dc04329",
//     account_status: "SUCCEEDED",
//   },
//   {
//     role_arn: "arn:aws:iam::730335590432:role/OrganizationAccountAccessRole",
//     account_name: "advant.analytics+1user012334",
//     lastName: "Ferry",
//     timestamp: "2024-06-04T18:23:11.224000+00:00",
//     owner: "r367708@gmail.com",
//     region: "us-east-1",
//     account_id: "730335590432",
//     email: "advant.analytics+1user012334@gmail.com",
//     firstName: "Arnoldo",
//     owner_id: "f408b4e8-2031-7060-35bd-55174dc04329",
//     account_status: "SUCCEEDED",
//   },
//   {
//     role_arn: "arn:aws:iam::637423435710:role/OrganizationAccountAccessRole",
//     account_name: "advant.analytics+1user022334",
//     lastName: "Hagenes",
//     timestamp: "2024-06-04T18:23:37.004000+00:00",
//     owner: "r367708@gmail.com",
//     region: "us-east-1",
//     account_id: "637423435710",
//     email: "advant.analytics+1user022334@gmail.com",
//     firstName: "Kennith",
//     owner_id: "f408b4e8-2031-7060-35bd-55174dc04329",
//     account_status: "SUCCEEDED",
//   },
//   {
//     role_arn: "arn:aws:iam::730335590432:role/OrganizationAccountAccessRole",
//     account_name: "advant.analytics+1user012334",
//     lastName: "Ferry",
//     timestamp: "2024-06-04T18:23:11.224000+00:00",
//     owner: "r367708@gmail.com",
//     region: "us-east-1",
//     account_id: "730335590432",
//     email: "advant.analytics+1user012334@gmail.com",
//     firstName: "Arnoldo",
//     owner_id: "f408b4e8-2031-7060-35bd-55174dc04329",
//     account_status: "SUCCEEDED",
//   },
//   {
//     role_arn: "arn:aws:iam::637423435710:role/OrganizationAccountAccessRole",
//     account_name: "advant.analytics+1user022334",
//     lastName: "Hagenes",
//     timestamp: "2024-06-04T18:23:37.004000+00:00",
//     owner: "r367708@gmail.com",
//     region: "us-east-1",
//     account_id: "637423435710",
//     email: "advant.analytics+1user022334@gmail.com",
//     firstName: "Kennith",
//     owner_id: "f408b4e8-2031-7060-35bd-55174dc04329",
//     account_status: "SUCCEEDED",
//   },
//   {
//     role_arn: "arn:aws:iam::730335590432:role/OrganizationAccountAccessRole",
//     account_name: "advant.analytics+1user012334",
//     lastName: "Ferry",
//     timestamp: "2024-06-04T18:23:11.224000+00:00",
//     owner: "r367708@gmail.com",
//     region: "us-east-1",
//     account_id: "730335590432",
//     email: "advant.analytics+1user012334@gmail.com",
//     firstName: "Arnoldo",
//     owner_id: "f408b4e8-2031-7060-35bd-55174dc04329",
//     account_status: "SUCCEEDED",
//   },
//   {
//     role_arn: "arn:aws:iam::637423435710:role/OrganizationAccountAccessRole",
//     account_name: "advant.analytics+1user022334",
//     lastName: "Hagenes",
//     timestamp: "2024-06-04T18:23:37.004000+00:00",
//     owner: "r367708@gmail.com",
//     region: "us-east-1",
//     account_id: "637423435710",
//     email: "advant.analytics+1user022334@gmail.com",
//     firstName: "Kennith",
//     owner_id: "f408b4e8-2031-7060-35bd-55174dc04329",
//     account_status: "SUCCEEDED",
//   },
// ];
