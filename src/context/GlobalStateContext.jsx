import React, { createContext, useEffect, useState } from "react";

export const GlobalStateContext = createContext({
  memberAccounts: null,
  setMemberAccounts: () => {},
  currentMemberAccount: null,
  setCurrentMemberAccount: () => {},
});

export const GlobalStateProvider = ({ children }) => {
  const [memberAccounts, setMemberAccounts] = useState(null);
  const [currentMemberAccount, setCurrentMemberAccount] = useState(null);

  return (
    <GlobalStateContext.Provider
      value={{
        memberAccounts,
        setMemberAccounts,
        currentMemberAccount,
        setCurrentMemberAccount,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};
