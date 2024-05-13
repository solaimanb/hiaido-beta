import { Outlet } from "react-router-dom";
import Header from "../components/shared/Header";
import Footer from "../components/shared/Footer";

const RootLayout = () => {
  return (
    <div className="bg-black/90 min-h-screen overflow-hidden">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default RootLayout;
