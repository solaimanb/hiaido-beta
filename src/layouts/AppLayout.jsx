import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const AppLayout = () => {
  console.log("AppLayout");
  return (
    <div className="bg-[#1a1a1a] min-h-screen overflow-hidden flex">
      <div className="p-2">
        <Sidebar />
      </div>
      <div className="w-full flex justify-center">
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;
