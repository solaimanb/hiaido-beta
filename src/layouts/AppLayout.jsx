import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import {
  GlobalStateProvider,
  useGlobalState,
} from "@/context/GlobalStateContext";
import Loading from "@/components/shared/Loading";

const AppLayout = () => {
  // console.log("AppLayout");

  const { userAttributes } = useGlobalState();
  console.log(userAttributes);
  // if (!userAttributes) {
  //   return <Loading />;
  // }

  return (
    // <GlobalStateProvider>
    <div className="dark:bg-[#1a1a1a] bg-neutral-50 relative z-0 flex h-full w-full overflow-hidden">
      <div className="p-0">
        <Sidebar />
      </div>
      <div className="relative flex h-full max-w-full flex-1 overflow-hidden">
        <Outlet />
      </div>
    </div>
    // </GlobalStateProvider>
  );
};

export default AppLayout;
