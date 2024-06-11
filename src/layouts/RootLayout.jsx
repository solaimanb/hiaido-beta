import { Outlet } from "react-router-dom";
import Loading from "../components/shared/Loading";
import { Suspense, lazy } from "react";

// Using React.lazy to dynamically import components for the RootLayout.
const Header = lazy(() => import("../components/shared/Header"));
const Footer = lazy(() => import("../components/shared/Footer"));
const ScrollToTopButton = lazy(() =>
  import("../components/shared/ScrollToTopButton")
);

const RootLayout = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-dark">
      <Suspense fallback={<Loading />}>
        <Header />
        <Outlet />
        <Footer />
        <ScrollToTopButton />
      </Suspense>
    </div>
  );
};

export default RootLayout;
