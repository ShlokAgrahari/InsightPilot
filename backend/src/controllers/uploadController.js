import parsePDF from "../parsers/pdfParser.js";
import chunkText from "../utils/chunkText.js";
import embedText from "../services/embedText.js";
import storeChunks from "../services/storeChunks.js";

export const uploadDocument = async (req, res) => {

    try {

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded"
            });
        }

        console.log("Uploaded File:");
        console.log(req.file);

        const extractedText = await parsePDF(
            req.file.path
        );

        console.log("Text Extracted");

        const chunks = chunkText(
            extractedText
        );

        console.log("Total Chunks:");
        console.log(chunks.length);

        const embeddings = [];

        for (const chunk of chunks) {

            const embedding =
                await embedText(chunk);

            embeddings.push(embedding);
        }

        console.log("Embeddings Generated");

        await storeChunks(
            chunks,
            embeddings,
            req.file.originalname
        );

        console.log(
            "Chunks Stored in Weaviate"
        );

        res.status(200).json({
            success: true,
            message:
                "PDF uploaded and stored successfully",
            totalChunks: chunks.length,
            totalEmbeddings: embeddings.length
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};