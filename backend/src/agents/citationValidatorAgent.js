import {
    traceable
} from "langsmith/traceable";

import groq from
"../config/groq.js";

const citationValidatorAgent =
traceable(

    async (state) => {

        console.log(
            "Citation Validator Running"
        );

        const context =
            state.rerankedChunks.map(

                (item, index) =>

                    `[C${index + 1}]
${item.properties.text}`

            ).join("\n\n");

        const prompt = `

You are an AI citation validator.

Check whether the answer is
supported by the provided context.

Tasks:
- detect unsupported claims
- detect fake citations
- remove hallucinations
- improve factual grounding

IMPORTANT:
Return ONLY corrected final answer.

CONTEXT:
${context}

ANSWER:
${state.finalAnswer}
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

                temperature: 0.2
            });

        return {

            finalAnswer:
                response.choices[0]
                .message.content
        };
    },

    {
        name:
            "Citation Validator Agent"
    }
);

export default
citationValidatorAgent;