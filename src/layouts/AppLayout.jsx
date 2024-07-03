import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useGlobalState } from "@/context/GlobalStateContext";
import Loader from "@/components/Loader";

const AppLayout = () => {
  const { userAttributes } = useGlobalState();

  const location = useLocation();

  const dontShowRouteSidebar = ["/terms"];

  if (!userAttributes) {
    return <Loader />;
  }

  return (
    <div className="dark:bg-[#1a1a1a] bg-neutral-50 relative z-0 flex h-full w-full overflow-hidden">
      <div className="p-0">
        {!dontShowRouteSidebar.includes(location.pathname) && <Sidebar />}
      </div>
      <div className="relative flex h-full max-w-full flex-1 overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;
