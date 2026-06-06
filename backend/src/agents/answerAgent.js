import {
    traceable
} from "langsmith/traceable";

import generateAnswer from
"../services/generateAnswer.js";

const answerAgent = traceable(
    
    async (
        state
    ) => {
        console.log(
    "CHAT HISTORY:",
    state.chatHistory
);
        console.log(
            "Answer Agent Running"
        );

        const answer =
            await generateAnswer(

                state.query,

                state.rerankedChunks,

                state.chatHistory || []
            );

        return {

            finalAnswer:
                answer
        };
    },

    {
        name:
            "Answer Agent"
    }
);

export default answerAgent;