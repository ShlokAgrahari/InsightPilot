import client from "../config/weaviate.js";

const storeChunks = async (
    chunks,
    embeddings,
    fileName
) => {

    try {

        const collection =
            client.collections.get(
                "Documents"
            );

        for (let i = 0; i < chunks.length; i++) {

            await collection.data.insert({

                properties: {
                    text: chunks[i],
                    source: fileName
                },

                vectors: {
                    default: embeddings[i]
                }
            });
        }

        console.log(
            "Chunks stored successfully"
        );

    } catch (error) {

        console.log(error);

        throw error;
    }
};

export default storeChunks;