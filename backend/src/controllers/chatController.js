import graph from
"../graph/intelligenceGraph.js";

import ChatHistory from
"../models/ChatHistory.js";

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

        const history =
            await ChatHistory.find({

                userId:
                    req.user._id

            })

            .sort({

                createdAt: 1

            })

            .limit(10);
console.log(history);
        const chatHistory =
            history.map(

                item => ({

                    role:
                        item.role,

                    content:
                        item.content
                })
            );

        const result =
            await graph.invoke({

                query,

                userId:
                    req.user._id.toString(),

                chatHistory,

                retryCount: 0,

                answerValid: false
            });

        await ChatHistory.insertMany([

            {

                userId:
                    req.user._id,

                role:
                    "user",

                content:
                    query
            },

            {

                userId:
                    req.user._id,

                role:
                    "assistant",

                content:
                    result.finalAnswer
            }
        ]);

        res.status(200).json({

            success: true,

            answer:
                result.finalAnswer,

            citations:
                result.rerankedChunks?.map(

                    (item, index) => ({

                        citation:
                            `C${index + 1}`,

                        source:
                            item.properties.source,

                        text:
                            item.properties.text
                    })

                ) || [],

            webResults:
                result.webResults,

            agentLogs: [

                {
                    agent:
                        "Supervisor Agent",

                    status:
                        "completed"
                },

                {
                    agent:
                        "Retrieval Agent",

                    status:
                        result.retrievedChunks
                            ? "completed"
                            : "skipped"
                },

                {
                    agent:
                        "Web Agent",

                    status:
                        result.webResults
                            ? "completed"
                            : "skipped"
                },

                {
                    agent:
                        "Retry Agent",

                    status:
                        "completed"
                },

                {
                    agent:
                        "Reflection Agent",

                    status:
                        "completed"
                },

                {
                    agent:
                        "Citation Validator",

                    status:
                        "completed"
                }
            ]
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