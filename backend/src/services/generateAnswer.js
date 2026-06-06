import groq from
"../config/groq.js";

const generateAnswer = async (

    query,

    chunks,

    chatHistory = []

) => {

    try {

        const conversationHistory =

            chatHistory.map(

                item =>

`${item.role.toUpperCase()}:
${item.content}`

            ).join("\n\n");

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

Use the previous conversation to understand follow-up questions.

PREVIOUS CONVERSATION:

${conversationHistory}

================================

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

- Understand references such as:
  "it"
  "that project"
  "the platform"
  using previous conversation.

- Give detailed answer

- Use citations

- Compare intelligently

- Do not hallucinate

- Use only provided context

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