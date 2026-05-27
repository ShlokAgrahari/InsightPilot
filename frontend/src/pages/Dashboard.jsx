import {
    useState
} from "react";

import Sidebar from
"../components/Sidebar";

import ChatSection from
"../components/ChatSection";

import AgentPanel from
"../components/AgentPanel";

const Dashboard = () => {

    const [
        agentLogs,

        setAgentLogs

    ] = useState([]);

    return (

        <div className="
        h-screen
        bg-slate-950
        text-white
        flex
        overflow-hidden
        ">

            <Sidebar />

            <ChatSection

                setAgentLogs={
                    setAgentLogs
                }
            />

            <AgentPanel

                agentLogs={
                    agentLogs
                }
            />

        </div>
    );
};

export default Dashboard;