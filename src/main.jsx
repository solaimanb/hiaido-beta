import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { StoreProvider } from "./store/Store.jsx";
import { Theme } from "@radix-ui/themes";
import { Authenticator, View } from "@aws-amplify/ui-react";

import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Authenticator.Provider>
      <View>
        <BrowserRouter>
          <StoreProvider>
            <Theme accentColor="blue" appearance="dark">
              <App />
              {/* <ThemePanel /> */}
            </Theme>
          </StoreProvider>
        </BrowserRouter>
      </View>
    </Authenticator.Provider>
  </React.StrictMode>
);
