import groq from
"../config/groq.js";

const generateAnswer = async (

    query,

    chunks

) => {

    try {

        const internalDocs =
            chunks.filter(

                (item) =>

                    item.properties
                    .source !== "web"
            );

        const webDocs =
            chunks.filter(

                (item) =>

                    item.properties
                    .source === "web"
            );

        const internalContext =
            internalDocs.map(

                (item, index) =>

                    `[C${index + 1}]
${item.properties.text}`

            ).join("\n\n");

        const webContext =
            webDocs.map(

                (item, index) =>

                    `[W${index + 1}]
${item.properties.text}`

            ).join("\n\n");

        const prompt = `

You are an AI research assistant.

Use BOTH:
1. Internal documents
2. Web results

when relevant.

If comparison is requested,
analyze both carefully.

INTERNAL DOCUMENTS:
${internalContext}

WEB RESULTS:
${webContext}

QUESTION:
${query}

Instructions:
- Give detailed answer
- Use citations
- Compare intelligently
- Do not hallucinate
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