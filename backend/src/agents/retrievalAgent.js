import {
    traceable
} from "langsmith/traceable";

import searchChunks from 
"../services/searchChunks.js";

const retrievalAgent = traceable(

    async (
        state
    ) => {

        console.log(
            "Retrieval Started"
        );

        const retrievedChunks =
            await searchChunks(
                state.query,
                state.userId
            );

        console.log(
            "Retrieval Finished"
        );

        return {

            retrievedChunks
        };
    },

    {
        name:
            "Retrieval Agent"
    }
);

export default retrievalAgent;