import graph from
"../graph/intelligenceGraph.js";

export const chatWithDocs =
async (req, res) => {

    try {

        const { query } =
            req.body;

        if (!query) {

            return res.status(400).json({

                success: false,

                message:
                    "Query required"
            });
        }

        const result =
            await graph.invoke({

                query
            });

        res.status(200).json({

            success: true,

            answer:
                result.finalAnswer,

            citations:
                result.rerankedChunks.map(

                    (item, index) => ({

                        citation:
                            `C${index + 1}`,

                        source:
                            item.properties.source,

                        text:
                            item.properties.text
                    })
                ),

            webResults:
                result.webResults
        });

    } catch (error) {

        console.log(
            "CHAT ERROR:",
            error
        );

        res.status(500).json({

            success: false,

            message:
                error.message
        });
    }
};