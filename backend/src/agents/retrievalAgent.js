import {
    traceable
} from "langsmith/traceable";

import searchChunks from
"../services/searchChunks.js";

const retrievalAgent = traceable(

    async (state) => {

        console.log(
            "Retrieval Started"
        );

        const queries =
            state.expandedQueries ||
            [state.query];

        const results =
            await Promise.all(

                queries.map(

                    query =>

                        searchChunks(
                            query,
                            state.userId
                        )
                )
            );

        const allChunks =
            results.flat();

        const uniqueChunks =
            Array.from(

                new Map(

                    allChunks.map(
                        chunk => [

                            chunk.uuid,

                            chunk
                        ]
                    )

                ).values()
            );

        console.log(
            `Retrieved ${uniqueChunks.length} chunks`
        );

        return {

            retrievedChunks:
                uniqueChunks
        };
    },

    {
        name:
            "Retrieval Agent"
    }
);

export default retrievalAgent;