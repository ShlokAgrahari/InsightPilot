import rerankerAgent from
"./rerankerAgent.js";

const rerankerAgentNode =
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
};

export default
rerankerAgentNode;