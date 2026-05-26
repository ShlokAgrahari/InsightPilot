import client from "../config/weaviate.js";
import embedText from "./embedText.js";

const searchChunks = async (
    query
) => {

    try {

        const collection =
            client.collections.get(
                "Documents"
            );

        const queryEmbedding =
            await embedText(query);

        const response =
            await collection.query.hybrid(
                query,
                {
                    vector: queryEmbedding,

                    alpha: 0.7,

                    limit: 5
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

        console.log(error);

        throw error;
    }
};

export default searchChunks;