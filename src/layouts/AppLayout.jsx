import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const AppLayout = () => {
  console.log("AppLayout");
  return (
    <div className="bg-neutral-900 min-h-screen overflow-hidden flex">
      <div className="p-2">
        <Sidebar />
      </div>
      <Outlet />
    </div>
  );
};

export default AppLayout;
