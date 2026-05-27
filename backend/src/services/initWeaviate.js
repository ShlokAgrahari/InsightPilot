import client from
"../config/weaviate.js";

const initWeaviate =
async () => {

    try {

        const exists =
        await client.collections
        .exists("Documents");

        if (exists) {

            console.log(
                "Documents collection already exists"
            );

            return;
        }

        await client.collections
        .create({

            name: "Documents",

            properties: [

                {
                    name: "text",

                    dataType: "text"
                },

                {
                    name: "source",

                    dataType: "text"
                },

                {
                    name: "userId",

                    dataType: "text"
                }
            ],

            vectorizers: []
        });

        console.log(
            "Documents collection created"
        );

    } catch (error) {

        console.log(error);
    }
};

export default initWeaviate;