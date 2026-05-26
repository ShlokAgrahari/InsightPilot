import rerankChunks from
"../services/rerankChunks.js";

const rerankerAgent = async (
    query,
    chunks
) => {

    const reranked =
        await rerankChunks(
            query,
            chunks
        );

    return reranked;
};

export default rerankerAgent;