import client from "../config/weaviate.js";
import embedText from "./embedText.js";

const searchChunks = async (query) => {

    try {

        const collection =
            client.collections.get(
                "Documents"
            );

        const queryEmbedding =
            await embedText(query);

        const response =
            await collection.query.nearVector(
                queryEmbedding,
                {
                    limit: 5,
                    returnMetadata: ["distance"]
                }
            );

        console.log(
            JSON.stringify(
                response,
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