import Sidebar from
"../components/Sidebar";

import ChatSection from
"../components/ChatSection";

import AgentPanel from
"../components/AgentPanel";

const Dashboard = () => {

    return (

        <div className="
        h-screen
        bg-slate-950
        text-white
        flex
        overflow-hidden
        ">

            <Sidebar />

            <ChatSection />

            <AgentPanel />

        </div>
    );
};

export default Dashboard;