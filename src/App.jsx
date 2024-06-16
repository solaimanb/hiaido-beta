import { HelmetProvider } from "react-helmet-async";
import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ButtonGradient from "./assets/svg/ButtonGradient";
import "@radix-ui/themes/styles.css";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { Toaster } from "react-hot-toast";
import AppLayout from "./layouts/AppLayout.jsx";
import UnderConstruction from "./pages/UnderConstruction.jsx";
import { navbarData } from "./components/Sidebar.jsx";
import AccountFactory from "./pages/AccountFactory.jsx";
import { Suspense, lazy } from "react";
import Loading from "./components/shared/Loading.jsx";

// Using React.lazy to dynamically import components for the App page.
const RootLayout = lazy(() => import("./layouts/RootLayout"));
const Landing = lazy(() => import("./pages/Landing"));
const Hiring = lazy(() => import("./pages/Hiring"));
const ContactUs = lazy(() => import("./pages/ContactUs"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Login = lazy(() => import("./pages/Login"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Chat = lazy(() => import("./pages/Chat.jsx"));
import awsExports from "./awsExports.js";
import { Amplify } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";
import { signInWithRedirect } from "aws-amplify/auth";

// Amplify.configure(awsExports);
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
          providers: ["Google", "Amazon"],
        },
      },
    },
  },
});

const App = () => {
  // useEffect(() => {
  //   // Smooth Scroll Trigger:
  //   (async () => {
  //     const LocomotiveScroll = (await import("locomotive-scroll")).default;
  //     // eslint-disable-next-line no-unused-vars
  //     const locomotiveScroll = new LocomotiveScroll();
  //   })();
  // }, []);

  const { route, authStatus, error, user } = useAuthenticator((context) => [
    context.route,
    context.authStatus,
  ]);

  console.log(route, authStatus, error, user);

  return (
    <Suspense fallback={authStatus === "configuring" && <Loading />}>
      <HelmetProvider>
        <Routes>
          {/* Root Layout */}
          <Route path="/" element={<RootLayout />}>
            <Route index element={<Landing />} />

            <Route path="/hiring" element={<Hiring />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/privacy" element={<Privacy />} />
          </Route>

          <Route
            element={
              authStatus === "authenticated" ? (
                <AppLayout />
              ) : (
                <Navigate to="/login" />
              )
            }
          >
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

          {/* Others */}
          <Route
            path="/login"
            element={
              route === "authenticated" ? <Navigate to="/chat" /> : <Login />
            }
          />

          {/* <Route
            path="/chat"
            element={
              route === "authenticated" ? <Chat /> : <Navigate to="/login" />
            }
          /> */}

          {/* Not Found */}
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
