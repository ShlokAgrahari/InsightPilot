import groq from "../config/groq.js";

const generateAnswer = async (
    query,
    chunks
) => {

    try {

        const formattedContext =
            chunks.map((item, index) => {

                return `
[C${index + 1}]
${item.properties.text}
`;
            }).join("\n\n");

        const prompt = `
You are a helpful AI assistant.

Answer ONLY using the provided context.

RULES:
1. Every important statement MUST include citation.
2. Use citations like [C1], [C2].
3. Do NOT make up information.
4. If answer not found, say:
"Information not found in documents."

CONTEXT:
${formattedContext}

QUESTION:
${query}
`;

        const response =
            await groq.chat.completions.create({

                model: "llama-3.3-70b-versatile",

                messages: [
                    {
                        role: "user",
                        content: prompt
                    }
                ],

                temperature: 0.2
            });

        return response.choices[0]
            .message.content;

    } catch (error) {

        console.log(error);

        throw error;
    }
};

export default generateAnswer;