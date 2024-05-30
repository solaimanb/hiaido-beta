import { HelmetProvider } from "react-helmet-async";
import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ButtonGradient from "./assets/svg/ButtonGradient";
import "@radix-ui/themes/styles.css";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { Toaster } from "react-hot-toast";
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
    <Suspense fallback={<Loading />}>
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

        <ButtonGradient />
        <ToastContainer />
      </HelmetProvider>
    </Suspense>
  );
};

export default App;
