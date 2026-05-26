import searchChunks from "../services/searchChunks.js";
import generateAnswer from "../services/generateAnswer.js";
import rerankerAgent
from "../agents/rerankerAgent.js";
export const chatWithDocs = async (
    req,
    res
) => {

    try {

        const { query } = req.body;

        if (!query) {

            return res.status(400).json({
                success: false,
                message: "Query required"
            });
        }

        const retrievedChunks =
    await searchChunks(query);

const rerankedChunks =
    await rerankerAgent(
        query,
        retrievedChunks
    );

const answer =
    await generateAnswer(
        query,
        rerankedChunks
    );
        res.status(200).json({
    success: true,

    answer,

    citations: rerankedChunks.map(
        (item, index) => ({
            citation: `C${index + 1}`,

            source:
                item.properties.source,

            text:
                item.properties.text
        })
    )
});
    } catch (error) {

    console.log(
        "CHAT ERROR:",
        error
    );

    res.status(500).json({
        success: false,

        message: error.message,

        error
    });
}
};