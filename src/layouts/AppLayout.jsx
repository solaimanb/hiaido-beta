import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const AppLayout = () => {
  console.log("AppLayout");
  return (
    <div className="bg-[#1a1a1a] relative z-0 flex h-full w-full overflow-hidden">
      <div className="p-2">
        <Sidebar />
      </div>
      <div className="relative flex h-full max-w-full flex-1 overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;
