import {
    traceable
} from "langsmith/traceable";

import groq from "../config/groq.js";

const reflectionAgent = traceable(

    async (
        state,
        context
    ) => {

        console.log(
            "Reflection Agent Running"
        );

        const prompt = `

You are an elite AI response refinement agent for a RAG system.

Your responsibility is to improve the final answer while ensuring:
- factual accuracy
- grounded reasoning
- clarity
- conciseness
- professional tone
- better structure
- no hallucinations

You MUST strictly use the provided CONTEXT as the source of truth.

========================
RULES
========================

1. Do NOT invent facts.
2. Do NOT add information not supported by CONTEXT.
3. Remove unsupported claims.
4. Preserve citations exactly if present.
5. Improve formatting and readability.
6. Keep technical accuracy.
7. Keep the answer direct and useful.
8. If the answer contains uncertain claims not supported by CONTEXT, remove them.
9. Do NOT mention:
   - hallucinations
   - unsupported claims
   - review process
   - analysis
   - reasoning steps
   - critique
10. Return ONLY the improved final answer.

========================
CONTEXT
========================

${context}

========================
ORIGINAL ANSWER
========================

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

                temperature: 0.1
            });

        return {
            finalAnswer:
                response.choices[0]
                    .message.content
        };
    },

    {
        name:
            "Reflection Agent"
    }
);

export default reflectionAgent;