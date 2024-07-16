import { HelmetProvider } from "react-helmet-async";
import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ButtonGradient from "./assets/svg/ButtonGradient.jsx";
import "@radix-ui/themes/styles.css";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { Toaster } from "react-hot-toast";
import UnderConstruction from "./pages/UnderConstruction.jsx";
import { Suspense, lazy, useEffect, useState } from "react";
import Loading from "./components/shared/Loading.jsx";
import AccountFactory from "@/pages/AccountFactory";
import AppLayout from "@/layouts/AppLayout";

import { Amplify } from "aws-amplify";
import { GlobalStateProvider } from "./context/GlobalStateContext.js";
import Enterprise from "./pages/Enterprise.jsx";
import About from "./pages/About.jsx";
import Loader from "./components/Loader.js";
import Subscriptions from "./pages/Subscriptions.js";

// Using React.lazy to dynamically import components for the App page.
const Onboarding = lazy(() => import("./pages/Onboarding.js"));
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
          redirectSignIn: [
            "http://localhost:5173/chat",
            "https://hiaido.com/chat",
            "https://hiaido.cloud/chat",
          ],
          redirectSignOut: [
            "http://localhost:5173",
            "https://hiaido.com",
            "https://hiaido.cloud",
          ],
          responseType: "code",
          scopes: ["email", "phone", "aws.cognito.signin.user.admin", "openid"],
          providers: ["Google"],
        },
      },
    },
  },
});

const App = () => {
  const { route, authStatus } = useAuthenticator((context) => [
    context.route,
    context.authStatus,
  ]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // await someAuthCheckFunction();
      } catch (e) {
        console.error("Failed to check auth status", e);
      } finally {
        setLoading(false);
      }
    };
    checkAuthStatus();
  }, []);

  console.log(authStatus);

  // if (authStatus === "configuring") {
  //   return <Loader />;
  // }

  if (loading) {
    return <Loading />;
  }

  return (
    <Suspense fallback={authStatus === "configuring" && <Loader />}>
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
            <Route path="/terms" element={<Terms />} />
          </Route>

          {authStatus === "authenticated" ? (
            <Route
              element={
                <GlobalStateProvider>
                  <AppLayout />
                </GlobalStateProvider>
              }
            >
              <Route path="/onboarding" element={<Onboarding />} />
              <Route path="/dashboard" element={<UnderConstruction />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/account-factory" element={<AccountFactory />} />
              <Route path="/subscriptions" element={<Subscriptions />} />
              <Route path="/usage-analytics" element={<UnderConstruction />} />
              <Route path="/deployments" element={<UnderConstruction />} />
              <Route path="/scheduler" element={<UnderConstruction />} />
              <Route path="/feature-requests" element={<UnderConstruction />} />
              <Route path="/user-management" element={<UnderConstruction />} />
              <Route path="/billing" element={<UnderConstruction />} />
              <Route path="/tickets" element={<UnderConstruction />} />
              <Route path="/settings" element={<UnderConstruction />} />
              <Route path="/help" element={<UnderConstruction />} />
              <Route path="/login" element={<Navigate to="/chat" />} />
            </Route>
          ) : (
            <Route
              path="/login"
              element={
                route === "authenticated" ? <Navigate to="/chat" /> : <Login />
              }
            />
          )}
          {authStatus === "authenticated" && (
            <Route path="*" element={<NotFound />} />
          )}
          {authStatus === "unauthenticated" && (
            <Route path="*" element={<Navigate to="/login" />} />
          )}
        </Routes>
        <Toaster />
        <ButtonGradient />
        <ToastContainer />
      </HelmetProvider>
    </Suspense>
  );
};

export default App;
