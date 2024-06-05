import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { StoreProvider } from "./store/Store.jsx";
import { Theme, ThemePanel } from "@radix-ui/themes";
import { Authenticator, View } from "@aws-amplify/ui-react";
import { ThemeProvider } from "./context/ThemeContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <StoreProvider>
        <Authenticator.Provider>
          <View>
            <ThemeProvider>
              <Theme accentColor="blue" className="h-screen">
                <App />
                {/* <ThemePanel /> */}
              </Theme>
            </ThemeProvider>
          </View>
        </Authenticator.Provider>
      </StoreProvider>
    </BrowserRouter>
  </React.StrictMode>
);
