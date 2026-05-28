import {
    traceable
} from "langsmith/traceable";

import rerankerAgent from 
"./rerankerAgent.js";

const rerankerAgentNode =
traceable(

    async (state) => {

        console.log(
            "Reranker Agent Running"
        );

        const rerankedChunks =
            await rerankerAgent(

                state.query,

                state.mergedResults
            );

        return {

            rerankedChunks
        };
    },

    {
        name:
            "Reranker Agent"
    }
);

export default
rerankerAgentNode;