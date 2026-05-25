import groq from "../config/groq.js";

const generateAnswer = async (
    query,
    chunks
) => {

    try {

        const context = chunks
            .map((item) =>
                item.properties.text
            )
            .join("\n\n");

        const prompt = `
You are a helpful AI assistant.

Answer ONLY from the provided context.

If answer is not available,
say:
"Information not found in documents."

Context:
${context}

Question:
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

                temperature: 0.3
            });

        return response.choices[0]
            .message.content;

    } catch (error) {

        console.log(error);

        throw error;
    }
};

export default generateAnswer;