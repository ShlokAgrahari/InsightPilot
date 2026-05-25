import searchChunks from "../services/searchChunks.js";
import generateAnswer from "../services/generateAnswer.js";

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

        const results =
            await searchChunks(query);

        const answer =
            await generateAnswer(
                query,
                results
            );

        res.status(200).json({
            success: true,
            answer,
            retrievedChunks: results
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};