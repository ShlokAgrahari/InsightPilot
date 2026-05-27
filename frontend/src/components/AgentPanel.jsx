const agents = [

    "Supervisor Agent",

    "Retrieval Agent",

    "Web Agent",

    "Reflection Agent",

    "Citation Validator"
];

const AgentPanel = () => {

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
                    (agent) => (

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

                            <div className="
                            h-3
                            w-3
                            rounded-full
                            bg-green-500
                            ">

                            </div>

                        </div>

                        <p className="
                        text-sm
                        text-slate-400
                        mt-2
                        ">

                            Ready
                        </p>

                    </div>
                ))}

            </div>

        </div>
    );
};

export default AgentPanel;