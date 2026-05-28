import Document from
"../models/Document.js";

import client from
"../config/weaviate.js";

export const deleteDocument =
async (req, res) => {

    try {

        const { id } =
            req.params;

        // FIND DOCUMENT
        const document =
        await Document.findById(id);

        if (!document) {

            return res.status(404)
            .json({

                success: false,

                message:
                "Document not found"
            });
        }

        console.log(
            "Deleting:",
            document.fileName
        );

        // WEAVIATE COLLECTION
        const collection =
        client.collections.get(
            "Documents"
        );

        // GET ALL OBJECTS
        const response =
        await collection.query.fetchObjects({

            limit: 1000
        });

        // FILTER MATCHING CHUNKS
        const matchingObjects =
        response.objects.filter(

            (obj) =>

                obj.properties.source ===
                document.fileName
        );

        console.log(
            "Matching Chunks:",
            matchingObjects.length
        );

        // DELETE EACH CHUNK
        for (const obj of matchingObjects) {

            await collection.data.deleteById(
                obj.uuid
            );
        }

        console.log(
            "Weaviate delete success"
        );

        // DELETE MONGO DOC
        await Document.findByIdAndDelete(id);

        res.status(200).json({

            success: true,

            message:
            "Document deleted successfully"
        });

    } catch (error) {

        console.log(
            "DELETE DOC ERROR:",
            error
        );

        res.status(500).json({

            success: false,

            message:
            error.message
        });
    }
};