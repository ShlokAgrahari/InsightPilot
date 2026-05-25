import weaviate from "weaviate-client";
import client from "../config/weaviate.js";

const initWeaviate = async () => {

    const exists =
        await client.collections.exists(
            "Documents"
        );

    if (!exists) {

        await client.collections.create({

            name: "Documents",

            vectorizers: weaviate.configure.vectorizer.none(),

            properties: [
                {
                    name: "text",
                    dataType: "text"
                },
                {
                    name: "source",
                    dataType: "text"
                }
            ]
        });

        console.log(
            "Documents collection created"
        );

    } else {

        console.log(
            "Documents collection already exists"
        );
    }
};

export default initWeaviate;