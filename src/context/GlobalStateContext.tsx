import {
  ConnectedAccount,
  ManagedMemberAccount,
  MemberAccounts,
  Subscription,
} from "@/types";
import {
  FetchUserAttributesOutput,
  fetchAuthSession,
  fetchUserAttributes,
} from "aws-amplify/auth";
import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface GlobalStateContextType {
  memberAccounts: MemberAccounts | null;
  setMemberAccounts: React.Dispatch<
    React.SetStateAction<MemberAccounts | null>
  >;
  currentMemberAccount: ManagedMemberAccount | ConnectedAccount | null;
  setCurrentMemberAccount: React.Dispatch<
    React.SetStateAction<ManagedMemberAccount | ConnectedAccount | null>
  >;
  userAttributes: FetchUserAttributesOutput | null;
  hostedPage: any;
  subscription: Subscription | null | false;
}
export const GlobalStateContext = createContext<GlobalStateContextType>({
  memberAccounts: null,
  setMemberAccounts: () => {},
  currentMemberAccount: null,
  setCurrentMemberAccount: () => {},
  userAttributes: null,
  hostedPage: null,
  subscription: null,
});

export const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error(
      "useGlobalState must be used within an GlobalStateProvider"
    );
  }
  return context;
};

export const GlobalStateProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [memberAccounts, setMemberAccounts] = useState<MemberAccounts | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [currentMemberAccount, setCurrentMemberAccount] = useState<
    ManagedMemberAccount | ConnectedAccount | null
  >(null);
  const [userAttributes, setUserAttributes] =
    useState<FetchUserAttributesOutput | null>(null);

  // if {} means some hosted page is not available
  const [hostedPage, setHostedPage] = useState<any>(null);
  // if false means no subscription
  const [subscription, setSubscription] = useState<Subscription | null | false>(
    null
  );

  useEffect(() => {
    console.log("FETCH USER ATTRIBUTES");
    // TODO: add error if no email
    fetchUserAttributes()
      .then((res) => {
        console.log(res);
        setUserAttributes(res);
      })
      .catch((err) => {
        console.error(err);
      });

    // // just testing
    // fetchAuthSession()
    //   .then((res) => console.log(res))
    //   .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    getHostedPage();
  }, []);

  useEffect(() => {
    getSubscription();
  }, []);
  console.log(subscription);

  const getSubscription = async () => {
    const authSession = await fetchAuthSession();
    let idToken = authSession.tokens?.idToken?.toString();
    if (idToken) {
      let response = await fetch(
        "https://t19tszry50.execute-api.us-east-1.amazonaws.com/prod/subscription",
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        }
      );

      const data = await response.json();
      if (response.ok) {
        console.log(data);
        if (data.subscription) {
          setSubscription(data.subscription);
        } else {
          setSubscription(false);
        }
      } else {
        if (response.status === 404) {
          setSubscription(false);
        }
        throw new Error(data.message);
      }
    }
  };

  const getHostedPage = async () => {
    const authSession = await fetchAuthSession();
    let idToken = authSession.tokens?.idToken?.toString();
    if (idToken) {
      let response = await fetch(
        "https://t19tszry50.execute-api.us-east-1.amazonaws.com/prod/hosted-page",
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        }
      );

      const data = await response.json();
      if (response.ok) {
        console.log(data);
        if (data.hostedPage) {
          setHostedPage(data.hostedPage);
        }
      } else {
        throw new Error(data.message);
      }
    }
  };

  const fetchMemberAccounts: () => Promise<MemberAccounts> = async () => {
    // console.log("FETCHING MEMBER ACCOUNTS");

    try {
      let url =
        "https://t19tszry50.execute-api.us-east-1.amazonaws.com/prod/member-accounts";
      const result = await fetchAuthSession();
      // TODO: does not work for google and facebook
      // TODO: fix
      const idToken = result.tokens?.idToken?.toString();
      // console.log(result);
      const response = await fetch(url, {
        method: "GET",
        headers: { Authorization: `Bearer ${idToken}` },
      });
      const response_json = await response.json();
      // console.log(response_json);
      if (response.ok) {
        return response_json;
      } else {
        throw response_json;
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  useEffect(() => {
    fetchMemberAccounts()
      .then((res) => {
        console.log(res);
        setMemberAccounts(res);
        let cma = localStorage.getItem("current_member_account");
        if (cma) {
          let cmaObj = JSON.parse(cma);
          if (
            res.memberAccounts.some((val) => val.email === cmaObj.email) ||
            res.connectedAccounts.some(
              (val) => val.account_id === cmaObj.account_id
            )
          ) {
            setCurrentMemberAccount(cmaObj);
          } else {
            setCurrentMemberAccount(
              res.memberAccounts.length > 0
                ? res.memberAccounts[0]
                : res.connectedAccounts.length > 0
                ? res.connectedAccounts[0]
                : null
            );
          }
        } else {
          setCurrentMemberAccount(
            res.memberAccounts.length > 0
              ? res.memberAccounts[0]
              : res.connectedAccounts.length > 0
              ? res.connectedAccounts[0]
              : null
          );
        }
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      });
  }, []);

  return (
    <GlobalStateContext.Provider
      value={{
        memberAccounts,
        setMemberAccounts,
        currentMemberAccount,
        setCurrentMemberAccount,
        userAttributes,
        hostedPage,
        subscription,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};
