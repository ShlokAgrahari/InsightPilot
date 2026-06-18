import groq from "../config/groq.js";

const queryExpansionAgent = async (state) => {

    try {

        console.log(
            "Query Expansion Started"
        );

        const prompt = `
You are a retrieval optimization assistant.

Generate 4 alternative search queries that could help retrieve relevant documents.

Original Query:
${state.query}

Rules:
- Keep meaning same
- Use different wording
- Return only queries
- One query per line
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

        const queries =
            response.choices[0]
            .message.content
            .split("\n")
            .map(q =>
                q.replace(
                    /^\d+[\).\s-]*/,
                    ""
                ).trim()
            )
            .filter(Boolean);

        const expandedQueries =
            [...new Set([
                state.query,
                ...queries
            ])];

        console.log(
            "Expanded Queries:"
        );

        console.log(
            expandedQueries
        );

        return {
            expandedQueries
        };

    } catch (error) {

        console.log(
            "QUERY EXPANSION ERROR:",
            error
        );

        return {

            expandedQueries: [
                state.query
            ]
        };
    }
};

export default queryExpansionAgent;