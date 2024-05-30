import { lazy } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

// Using React.lazy to dynamically import components for the Chat page.
const Sidebar = lazy(() => import("./Sidebar"));
const ChatContainer = lazy(() => import("./ChatContainer"));
const Dashboard = lazy(() => import("./Dashboard"));

const Chat = () => {
  console.log("Chat")
  return (
    <div className="flex h-full">
      <div className="p-3">
        <Sidebar />
      </div>
      <PanelGroup direction="horizontal">
        <Panel defaultSize={60} className="max-w-[1100px] min-w-[920px]">
          <div className="pr-14 w-full px-4 pl-10">
            <ChatContainer />
          </div>
        </Panel>

        <PanelResizeHandle />
        <Panel className="min-w-[600px]">
          <Dashboard />
        </Panel>
      </PanelGroup>
    </div>
  );
};

export default Chat;
