import { pipeline } from "@xenova/transformers";
import { traceable } from "langsmith/traceable";

let reranker;

const rerankChunks = traceable(
    async (
        query,
        chunks
    ) => {

        try {

            if (!reranker) {

                reranker = await pipeline(
                    "text-classification",
                    "Xenova/ms-marco-MiniLM-L-6-v2"
                );
            }

            const scoredChunks =
                await Promise.all(

                    chunks.map(async (
                        chunk
                    ) => {

                        const result =
                            await reranker([
                                query,
                                chunk.properties.text
                            ]);

                        return {

                            ...chunk,

                            rerankScore:
                                result[0].score
                        };
                    })
                );

            scoredChunks.sort(
                (a, b) =>
                    b.rerankScore -
                    a.rerankScore
            );

            return scoredChunks.slice(0, 5);

        } catch (error) {

            console.log(error);

            throw error;
        }
    },
    {
        name: "rerank-chunks service"
    }
);

export default rerankChunks;