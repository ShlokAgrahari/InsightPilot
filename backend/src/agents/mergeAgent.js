const mergeAgent = async (
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
};

export default mergeAgent;