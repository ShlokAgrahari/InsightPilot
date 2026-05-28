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
            "Answer Agent Running"
        );

        const answer =
            await generateAnswer(

                state.query,

                state.rerankedChunks
            );

        return {

            finalAnswer: answer
        };
    },

    {
        name:
            "Answer Agent"
    }
);

export default answerAgent;