import dotenv from "dotenv";
dotenv.config();

import weaviate from "weaviate-client";

console.log(process.env.WEAVIATE_URL);

const client = await weaviate.connectToWeaviateCloud(
    process.env.WEAVIATE_URL,
    {
        authCredentials: new weaviate.ApiKey(
            process.env.WEAVIATE_API_KEY
        )
    }
);

export default client;