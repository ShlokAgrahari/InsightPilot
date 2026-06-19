import groq from "../config/groq.js";

const generateQueries = async (query) => {

    const prompt = `
Generate 4 alternative search queries.

Original Query:
${query}

Return only queries.
One per line.
`;

    const response =
        await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                {
                    role: "user",
                    content: prompt
                }
            ]
        });

    const queries =
        response.choices[0].message.content
            .split("\n")
            .filter(q => q.trim());

    return [query, ...queries];
};

export default generateQueries;