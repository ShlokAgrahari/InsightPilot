import client from "./config/weaviate.js";

const test = async () => {

    const collection =
        client.collections.get(
            "Documents"
        );

    const response =
        await collection.query.fetchObjects({
            limit: 5
        });

    console.log(
        JSON.stringify(
            response.objects,
            null,
            2
        )
    );
};

test();