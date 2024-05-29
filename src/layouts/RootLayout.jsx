import { Outlet } from "react-router-dom";
import Header from "../components/shared/Header";
import Footer from "../components/shared/Footer";
import ScrollToTopButton from "../components/shared/ScrollToTopButton";

const RootLayout = () => {
  return (
    <div className="bg-dark relative min-h-screen overflow-hidden">
      <Header />
      <Outlet />
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default RootLayout;
