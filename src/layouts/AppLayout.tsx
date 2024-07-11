import { Navigate, Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useGlobalState } from "@/context/GlobalStateContext";
import Loader from "@/components/Loader";
import { useEffect, useState } from "react";
import { fetchAuthSession } from "aws-amplify/auth";

const AppLayout = () => {
  const { userAttributes, memberAccounts, } = useGlobalState();
  const location = useLocation();

  const dontShowRouteSidebar = ["/onboarding"];
  console.log(memberAccounts);

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
      } else {
        throw new Error(data.message);
      }
    }
  };

  useEffect(() => {
    getHostedPage();
  }, []);

  if (!userAttributes || !memberAccounts) {
    return <Loader />;
  }
  if (
    memberAccounts.memberAccounts.length === 0 &&
    memberAccounts.connectedAccounts.length === 0 &&
    location.pathname !== "/onboarding"
  ) {
    return <Navigate to="/onboarding" />;
  }
  return (
    <div className="dark:bg-[#1a1a1a] bg-neutral-50 relative z-0 flex h-full w-full overflow-hidden">
      <div className="p-0">
        {!dontShowRouteSidebar.includes(location.pathname) && <Sidebar />}
      </div>
      <div className="relative flex h-full max-w-full flex-1 overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;
