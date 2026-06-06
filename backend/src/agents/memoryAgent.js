import { traceable } from "langsmith/traceable";

const memoryAgent = traceable(

    async (state) => {

        const history =
            state.chatHistory || [];

        const updatedHistory = [

            ...history,

            {
                role: "user",
                content: state.query
            },

            {
                role: "assistant",
                content: state.finalAnswer
            }

        ].slice(-8);

        return {
            chatHistory: updatedHistory
        };
    },

    {
        name: "Memory Agent"
    }
);

export default memoryAgent;