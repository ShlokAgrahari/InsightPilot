const agents = [

    "Supervisor Agent",

    "Retrieval Agent",

    "Web Agent",

    "Reflection Agent",

    "Citation Validator"
];

const AgentPanel = ({
    agentLogs
}) => {

    const getStatus =
    (agentName) => {

        const found =
        agentLogs?.find(

            (item) =>

                item.agent ===
                agentName
        );

        return found?.status
        || "waiting";
    };

    const getColor =
    (status) => {

        if (
            status ===
            "completed"
        ) {

            return
            "bg-green-500";
        }

        if (
            status ===
            "running"
        ) {

            return
            "bg-yellow-500";
        }

        if (
            status ===
            "skipped"
        ) {

            return
            "bg-slate-500";
        }

        return
        "bg-blue-500";
    };

    return (

        <div className="
        w-[320px]
        border-l
        border-slate-800
        bg-slate-900
        p-5
        ">

            <h2 className="
            text-xl
            font-semibold
            mb-6
            ">

                AI Agents
            </h2>

            <div className="
            space-y-4
            ">

                {agents.map(
                    (agent) => {

                    const status =
                    getStatus(agent);

                    return (

                    <div
                    key={agent}
                    className="
                    bg-slate-800
                    rounded-xl
                    p-4
                    ">

                        <div className="
                        flex
                        items-center
                        justify-between
                        ">

                            <h3 className="
                            font-medium
                            ">
                                {agent}
                            </h3>

                            <div className={`
                            h-3
                            w-3
                            rounded-full
                            ${getColor(status)}
                            `}>

                            </div>

                        </div>

                        <p className="
                        text-sm
                        text-slate-400
                        mt-2
                        capitalize
                        ">

                            {status}

                        </p>

                    </div>
                )})}

            </div>

        </div>
    );
};

export default AgentPanel;