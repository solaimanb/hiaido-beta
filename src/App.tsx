import { HelmetProvider } from "react-helmet-async";
import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ButtonGradient from "./assets/svg/ButtonGradient.jsx";
import "@radix-ui/themes/styles.css";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { Toaster } from "react-hot-toast";
import AppLayout from "./layouts/AppLayout.jsx";
import UnderConstruction from "./pages/UnderConstruction.jsx";
import { Suspense, lazy, useEffect, useState } from "react";
import Loading from "./components/shared/Loading.jsx";
import AccountFactory from "@/pages/AccountFactory";

import { Amplify } from "aws-amplify";
import { GlobalStateProvider } from "./context/GlobalStateContext.js";
import Enterprise from "./pages/Enterprise.jsx";
import About from "./pages/About.jsx";

// Using React.lazy to dynamically import components for the App page.
const RootLayout = lazy(() => import("./layouts/RootLayout.jsx"));
const Landing = lazy(() => import("./pages/Landing.jsx"));
const Hiring = lazy(() => import("./pages/Hiring.jsx"));
const ContactUs = lazy(() => import("./pages/ContactUs.jsx"));
const Pricing = lazy(() => import("./pages/Pricing.jsx"));
const Privacy = lazy(() => import("./pages/Privacy.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const NotFound = lazy(() => import("./pages/NotFound.jsx"));
const Chat = lazy(() => import("./pages/Chat.jsx"));
const Terms = lazy(() => import("./pages/Terms.jsx"));
const EthicalAI = lazy(() => import("./pages/EthicalAI.jsx"));

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: "us-east-1_kTokArf3J",
      userPoolClientId: "3tj4g5qhml5kiu1ds37bogvol3",
      signUpVerificationMethod: "code",
      loginWith: {
        oauth: {
          domain: "hiaido.auth.us-east-1.amazoncognito.com",
          redirectSignIn: ["http://localhost:5173/chat"],
          redirectSignOut: ["http://localhost:5173"],
          responseType: "code",
          scopes: ["email", "phone", "aws.cognito.signin.user.admin"],
          // providers: ["Google", "Facebook"],
        },
      },
    },
  },
});

const App = () => {
  const { route, authStatus} = useAuthenticator((context) => [
    context.route,
    context.authStatus,
  ]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // Assume some function to check authentication status
        // await someAuthCheckFunction();
      } catch (e) {
        console.error("Failed to check auth status", e);
      } finally {
        setLoading(false);
      }
    };
    checkAuthStatus();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <Suspense fallback={authStatus === "configuring" && <Loading />}>
      <HelmetProvider>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<Landing />} />
            <Route path="/hiring" element={<Hiring />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/enterprise" element={<Enterprise />} />
            <Route path="/about" element={<About />} />
            <Route path="/ethical-ai" element={<EthicalAI />} />
            <Route path="/login" element={<Login />} />
            <Route path="/terms" element={<Terms />} />
          </Route>

          <Route
            element={
              authStatus === "authenticated" ? (
                <GlobalStateProvider>
                  <AppLayout />
                </GlobalStateProvider>
              ) : (
                <Navigate to="/login" />
              )
            }
          >
            {/* <Route path="/terms" element={<Terms />} /> */}
            <Route path="/dashboard" element={<UnderConstruction />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/account-factory" element={<AccountFactory />} />
            <Route path="/usage-analytics" element={<UnderConstruction />} />
            <Route path="/deployments" element={<UnderConstruction />} />
            <Route path="/scheduler" element={<UnderConstruction />} />
            <Route path="/feature-requests" element={<UnderConstruction />} />
            <Route path="/user-management" element={<UnderConstruction />} />
            <Route path="/billing" element={<UnderConstruction />} />
            <Route path="/tickets" element={<UnderConstruction />} />
            <Route path="/settings" element={<UnderConstruction />} />
            <Route path="/help" element={<UnderConstruction />} />
          </Route>

          <Route
            path="/login"
            element={
              route === "authenticated" ? <Navigate to="/chat" /> : <Login />
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
        <ButtonGradient />
        <ToastContainer />
      </HelmetProvider>
    </Suspense>
  );
};

export default App;
