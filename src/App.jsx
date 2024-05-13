import ButtonGradient from "./assets/svg/ButtonGradient";
import Hiring from "./components/Hiring";
import Pricing from "./components/Pricing";

import { Route, Routes } from "react-router-dom";
import ContactUs from "./components/ContactUs";
import Login from "./components/Login";
import Privacy from "./components/Privacy";
import { useEffect, useState } from "react";
import Loading from "./components/Loading";
import Landing from "./pages/Landing";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   // Smooth Scroll Trigger:
  //   (async () => {
  //     const LocomotiveScroll = (await import("locomotive-scroll")).default;
  //     // eslint-disable-next-line no-unused-vars
  //     const locomotiveScroll = new LocomotiveScroll();
  //   })();
  // }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className=" overflow-hidden">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/hiring" element={<Hiring />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/privacy" element={<Privacy />} />
        </Routes>
      </div>

      <ButtonGradient />
    </>
  );
};

export default App;
