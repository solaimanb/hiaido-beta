import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { StoreProvider } from "./store/Store.jsx";
import { Theme } from "@radix-ui/themes";
import { Authenticator, View } from "@aws-amplify/ui-react";
import { ThemeProvider } from "./context/ThemeContext.jsx";

import "./index.css";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <StoreProvider>
        <Authenticator.Provider>
          <View>
            <ThemeProvider>
                <Theme accentColor="blue" className="h-screen">
                  <App />
                </Theme>
            </ThemeProvider>
          </View>
        </Authenticator.Provider>
      </StoreProvider>
    </BrowserRouter>
  </React.StrictMode>
);
