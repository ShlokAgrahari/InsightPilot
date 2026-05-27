import client from "../config/weaviate.js";
import embedText from "./embedText.js";

const searchChunks = async (
    query,
    userId
) => {
    try {

        // Generate query embedding
        const queryEmbedding =
            await embedText(query);

        console.log(
            "Query Embedding Generated"
        );

        // Get collection
        const collection =
            client.collections.get(
                "Documents"
            );

        // Hybrid Search
        const response =
            await collection.query.hybrid(
                query,
                {
                    vector: queryEmbedding,

                    // BM25 + Vector balance
                    alpha: 0.7,

                    limit: 5,

                    // Filter by user
                    filters:
                        collection.filter
                            .byProperty("userId")
                            .equal(userId)
                }
            );

        console.log(
            JSON.stringify(
                response.objects,
                null,
                2
            )
        );

        return response.objects;

    } catch (error) {

        console.log(
            "Hybrid Search Error:",
            error
        );

        throw error;
    }
};

export default searchChunks;