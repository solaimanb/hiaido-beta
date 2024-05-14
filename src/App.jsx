import ButtonGradient from "./assets/svg/ButtonGradient";
import Hiring from "./pages/Hiring";

import { Route, Routes } from "react-router-dom";
import ContactUs from "./pages/ContactUs";
import Privacy from "./pages/Privacy";
import Landing from "./pages/Landing";
import RootLayout from "./layouts/RootLayout";
import NotFound from "./pages/NotFound";
import Pricing from "./pages/Pricing";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";

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
    <>
      <div className="overflow-hidden">
        <Routes>
          {/* Root Layout */}
          <Route path="/" element={<RootLayout />}>
            <Route index element={<Landing />} />
            <Route path="hiring" element={<Hiring />} />
            <Route path="contact" element={<ContactUs />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/hiring" element={<Hiring />} />
          </Route>

          {/* Others */}
          <Route path="/login" element={<Login />} />

          {/* Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      <ButtonGradient />
      <ToastContainer />
    </>
  );
};

export default App;
