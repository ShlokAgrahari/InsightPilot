import {
    traceable
} from "langsmith/traceable";

const memoryAgent = traceable(

    async (
        state
    ) => {

        console.log(
            "Memory Agent Running"
        );

        const previousHistory =
            state.chatHistory || [];

        const updatedHistory = [

            ...previousHistory,

            {
                query:
                    state.query,

                answer:
                    state.finalAnswer
            }
        ];

        return {

            chatHistory:
                updatedHistory
        };
    },

    {
        name:
            "Memory Agent"
    }
);

export default memoryAgent;