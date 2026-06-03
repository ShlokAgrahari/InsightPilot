import { traceable }
from "langsmith/traceable";

import groq from
"../config/groq.js";

const retryAgent = traceable(
    
    async (state) => {

        console.log(
            "Retry Agent Running"
        );

        const context =
            state.rerankedChunks
                .map(
                    chunk =>
                    chunk.properties.text
                )
                .join("\n\n");

        const prompt = `

You are an answer evaluator.

Question:
${state.query}

Context:
${context}

Answer:
${state.finalAnswer}

Check:

1. Is the answer relevant?
2. Is the answer supported by context?
3. Is the answer complete?

Return ONLY:

VALID

or

INVALID

`;

        const response =
            await groq.chat.completions.create({

                model:
                "llama-3.3-70b-versatile",

                messages: [
                    {
                        role: "user",
                        content: prompt
                    }
                ],

                temperature: 0
            });

        const result =
            response.choices[0]
            .message.content
            .trim();

        return {

            answerValid:
                result === "VALID",

            retryCount:

                result === "VALID"

                ? state.retryCount || 0

                : (state.retryCount || 0) + 1
        };
    },

    {
        name:
            "Retry Agent"
    }
);

export default retryAgent;