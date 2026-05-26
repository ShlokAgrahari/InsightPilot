import groq from
"../config/groq.js";

const reflectionAgent = async (
    state
) => {

    console.log(
        "Reflection Agent Running"
    );

const prompt = `

You are an expert AI reviewer.

Improve the following answer.

Tasks:
- remove hallucinations
- improve reasoning
- improve clarity
- improve comparisons
- keep citations
- keep professional tone

IMPORTANT:
Return ONLY the improved final answer.

Do NOT include:
- analysis
- explanations
- review comments
- headings like "Analysis"

ORIGINAL ANSWER:
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
};

export default reflectionAgent;