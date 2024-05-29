import RootLayout from "./layouts/RootLayout";
import Landing from "./pages/Landing";
import Hiring from "./pages/Hiring";
import ContactUs from "./pages/ContactUs";
import Pricing from "./pages/Pricing";
import Privacy from "./pages/Privacy";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

import { HelmetProvider } from "react-helmet-async";
import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ButtonGradient from "./assets/svg/ButtonGradient";
import "@radix-ui/themes/styles.css";

import Chat from "./pages/Chat.jsx";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { Toaster } from "react-hot-toast";

const App = () => {
  // useEffect(() => {
  //   // Smooth Scroll Trigger:
  //   (async () => {
  //     const LocomotiveScroll = (await import("locomotive-scroll")).default;
  //     // eslint-disable-next-line no-unused-vars
  //     const locomotiveScroll = new LocomotiveScroll();
  //   })();
  // }, []);

  const { authStatus } = useAuthenticator((context) => [context.authStatus]);

  return (
    <HelmetProvider>
      <div className="bg-dark overflow-hidden">
        <Routes>
          {/* Root Layout */}
          <Route path="/" element={<RootLayout />}>
            <Route index element={<Landing />} />

            <Route path="/hiring" element={<Hiring />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/privacy" element={<Privacy />} />
          </Route>

          {/* Others */}
          <Route
            path="/login"
            element={
              authStatus !== "authenticated" ? (
                <Login />
              ) : (
                <Navigate to="/chat" />
              )
            }
          />

          <Route
            path="/chat"
            element={
              authStatus === "authenticated" ? (
                <Chat />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          {/* Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </div>

      <ButtonGradient />
      <ToastContainer />
    </HelmetProvider>
  );
};

export default App;
