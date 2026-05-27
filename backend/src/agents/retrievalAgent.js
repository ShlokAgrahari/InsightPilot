import searchChunks from
"../services/searchChunks.js";

const retrievalAgent = async (
    state
) => {

    console.log(
        "Retrieval Started"
    );

    const retrievedChunks =
        await searchChunks(
            state.query
        );

    console.log(
        "Retrieval Finished"
    );

    return {

        retrievedChunks
    };
};

export default retrievalAgent;