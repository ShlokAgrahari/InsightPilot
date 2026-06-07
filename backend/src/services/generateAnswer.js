import groq from "../config/groq.js";
import { traceable } from "langsmith/traceable";

const generateAnswer = traceable(
    async (
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
You are an intelligent AI assistant with access to:

1. Previous conversation history
2. Internal knowledge documents
3. Web search results

Your primary responsibility is to answer the user's question while maintaining full conversational context.

==============================
CONVERSATION HISTORY
==============================

${conversationHistory || "No previous conversation."}

==============================
INTERNAL DOCUMENTS
==============================

${internalContext || "No internal documents available."}

==============================
WEB RESULTS
==============================

${webContext || "No web results available."}

==============================
CURRENT USER QUESTION
==============================

${query}

==============================
REASONING RULES
==============================

1. ALWAYS analyze the conversation history before answering.

2. Resolve references from previous messages:
   - "he", "she", "they"
   - "that company"
   - "that project"
   - "my name"
   - "the internship"
   - "the code above"
   - any follow-up question

3. Treat information explicitly provided by the user in previous messages as conversational facts unless corrected later.


4. If the current question depends on earlier messages, answer using those messages even when the answer is not present in retrieved documents.

5. Use retrieved documents only when they are relevant.

6. Never ignore conversation history simply because documents are available.

7. If conversation history and retrieved documents conflict:
   - User-provided facts take priority for personal information.
   - Retrieved documents take priority for factual knowledge.

8. When answering:
   - First use conversation context.
   - Then use internal documents.
   - Then use web results.
   - Combine sources intelligently.

9. Do not invent information.
   If the answer cannot be determined from:
   - conversation history
   - internal documents
   - web results

   then clearly say:
   "I don't have enough information to answer that."

10. When using document evidence, cite sources:
    [C1], [C2] for internal documents
    [W1], [W2] for web results

11. Provide complete and helpful answers.
    For technical questions:
    - explain reasoning
    - include examples
    - compare alternatives when useful

12. If the user asks about themselves, previous messages, or something mentioned earlier in the conversation, prioritize conversation history over document retrieval.

==============================
ANSWER
==============================
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
    },
    {
        name: "generate answer service"
    }
);

export default generateAnswer;