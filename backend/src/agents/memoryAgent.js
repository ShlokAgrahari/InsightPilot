const memoryAgent = async (
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
};

export default memoryAgent;