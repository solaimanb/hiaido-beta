import Dashboard from "../components/ChatBot/Dashboard";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

import ChatContainer from "../components/ChatBot/ChatContainer";

const Chat = () => {
  console.log("Chat")
  return (
    <div className="h-full flex">
      <PanelGroup direction="horizontal">
        <Panel defaultSize={60} className="max-w-[1100px] min-w-[920px]">
          <div className="pr-14 w-full px-4 pl-10">
            <ChatContainer />
          </div>
        </Panel>
        <PanelResizeHandle />
        <Panel className="min-w-[600px]" >
            <Dashboard />
        </Panel>
      </PanelGroup>
    </div>
  );
};

export default Chat;
