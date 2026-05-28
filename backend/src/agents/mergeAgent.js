import {
    traceable
} from "langsmith/traceable";

const mergeAgent = traceable(

    async (
        state
    ) => {

        console.log(
            "Merge Agent Running"
        );

        const retrieved =
            state.retrievedChunks || [];

        const web =
            state.webResults || [];

        const mergedResults = [

            ...retrieved,

            ...web
        ];

        return {

            mergedResults
        };
    },

    {
        name:
            "Merge Agent"
    }
);

export default mergeAgent;