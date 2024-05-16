import ChatBotComponent from "./CahtBot";
import Tabs from "./Tabs";

function index() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 h-screen overflow-auto">
        <div className={`border-r border-slate-500 bg-slate-950`}>
          <ChatBotComponent />
        </div>
        <div className="bg-slate-950">
          <Tabs />
        </div>
      </div>
    </>
  )
}

export default index