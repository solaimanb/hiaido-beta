import { HelmetProvider } from "react-helmet-async";
import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ButtonGradient from "./assets/svg/ButtonGradient";
import "@radix-ui/themes/styles.css";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { Toaster } from "react-hot-toast";
import { Suspense, lazy } from "react";
import Loading from "./components/shared/Loading.jsx";
import Terms from "./pages/Terms.jsx";

// Using React.lazy to dynamically import components for the App page.
const RootLayout = lazy(() => import("./layouts/RootLayout"));
const Landing = lazy(() => import("./pages/Landing"));
const Products = lazy(() => import("./pages/Products"));
const Integrations = lazy(() => import("./pages/Integrations"));
const Enterprise = lazy(() => import("./pages/Enterprise"));
const Hiring = lazy(() => import("./pages/Hiring"));
const About = lazy(() => import("./pages/About"));
const Features = lazy(() => import("./pages/Features"));
const ContactUs = lazy(() => import("./pages/ContactUs"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Login = lazy(() => import("./pages/Login"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Chat = lazy(() => import("./pages/Chat.jsx"));
const EthicalAI = lazy(() => import("./pages/EthicalAI"));

const App = () => {
  // useEffect(() => {
  //   // Smooth Scroll Trigger:
  //   (async () => {
  //     const LocomotiveScroll = (await import("locomotive-scroll")).default;
  //     // eslint-disable-next-line no-unused-vars
  //     const locomotiveScroll = new LocomotiveScroll();
  //   })();
  // }, []);

  const { route, authStatus } = useAuthenticator((context) => [
    context.route,
    context.authStatus,
  ]);

  return (
    <Suspense fallback={authStatus === "configuring" && <Loading />}>
      <HelmetProvider>
        <Routes>
          {/* Root Layout */}
          <Route path="/" element={<RootLayout />}>
            <Route index element={<Landing />} />

            <Route path="/products" element={<Products />} />
            <Route path="/integrations" element={<Integrations />} />
            <Route path="/enterprise" element={<Enterprise />} />
            <Route path="/hiring" element={<Hiring />} />
            <Route path="/about" element={<About />} />
            <Route path="/features" element={<Features />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/ethical-ai" element={<EthicalAI />} />
          </Route>

          {/* Others */}
          <Route
            path="/login"
            element={
              route === "authenticated" ? <Navigate to="/chat" /> : <Login />
            }
          />

          <Route
            path="/chat"
            element={
              route === "authenticated" ? <Chat /> : <Navigate to="/login" />
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
