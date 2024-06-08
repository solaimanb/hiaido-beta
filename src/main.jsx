import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { StoreProvider } from "./store/Store.jsx";
import { Theme } from "@radix-ui/themes";
import { Authenticator, View } from "@aws-amplify/ui-react";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { GlobalStateProvider } from "./context/GlobalStateContext.jsx";

import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <StoreProvider>
        <Authenticator.Provider>
          <View>
            <ThemeProvider>
              <GlobalStateProvider>
                <Theme accentColor="blue" className="h-screen">
                  <App />
                  {/* <ThemePanel /> */}
                </Theme>
              </GlobalStateProvider>
            </ThemeProvider>
          </View>
        </Authenticator.Provider>
      </StoreProvider>
    </BrowserRouter>
  </React.StrictMode>
);
