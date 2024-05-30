import React from "react";
import { Panel } from "react-resizable-panels";
import Dashboard from "../components/ChatBot/Dashboard";

const AccountFactory = () => {
  return (
    <div className="w-full flex">
      <div className="flex-1 p-10">
        <h1 className="text-3xl">Member accounts</h1>
        <div className="flex justify-center">
          <span className="mt-10 text-neutral-500 text-lg">No member accounts found.</span>
        </div>
      </div>
      <div className="w-[720px]">
        <Dashboard />
      </div>
    </div>
  );
};

export default AccountFactory;
