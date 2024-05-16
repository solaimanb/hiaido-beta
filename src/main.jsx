import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.jsx";
import "./index.css";
import { StoreProvider } from "./store/Store.jsx";
import { Theme } from "@radix-ui/themes";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <StoreProvider>
        <Theme accentColor="blue" appearance="dark">
          <App />
          {/* <ThemePanel /> */}
        </Theme>
      </StoreProvider>
    </BrowserRouter>
  </React.StrictMode>
);
