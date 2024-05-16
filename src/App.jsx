import RootLayout from "./layouts/RootLayout";
import Landing from "./pages/Landing";
import Hiring from "./pages/Hiring";
import ContactUs from "./pages/ContactUs";
import Pricing from "./pages/Pricing";
import Privacy from "./pages/Privacy";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

import { HelmetProvider } from "react-helmet-async";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ButtonGradient from "./assets/svg/ButtonGradient";
import "@radix-ui/themes/styles.css";

import Chat from "./pages/Chat.jsx";

const App = () => {
  // useEffect(() => {
  //   // Smooth Scroll Trigger:
  //   (async () => {
  //     const LocomotiveScroll = (await import("locomotive-scroll")).default;
  //     // eslint-disable-next-line no-unused-vars
  //     const locomotiveScroll = new LocomotiveScroll();
  //   })();
  // }, []);

  return (
    <HelmetProvider>
      <div className="overflow-hidden">
        <Routes>
          {/* Root Layout */}
          <Route path="/" element={<RootLayout />}>
            <Route index element={<Landing />} />

            <Route path="hiring" element={<Hiring />} />
            <Route path="contact" element={<ContactUs />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="/privacy" element={<Privacy />} />
          </Route>

          {/* Others */}
          <Route path="/login" element={<Login />} />
          <Route path="/chat" element={<Chat />} />

          {/* Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      <ButtonGradient />
      <ToastContainer />
    </HelmetProvider>
  );
};

export default App;
