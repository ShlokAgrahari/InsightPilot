import { traceable }
from "langsmith/traceable";

import groq from
"../config/groq.js";

const supervisorAgent = traceable(

    async (state) => {

        console.log(
            "Supervisor Agent Running"
        );

        const query =
            state.query;

        const prompt = `

You are a routing agent.

Given a user query, decide:

1. Does it require document retrieval?
2. Does it require web search?

Return ONLY valid JSON:

{
  "useRetrieval": true,
  "useWeb": false
}

Rules:

- Questions about uploaded documents, resumes, PDFs, projects, reports, notes or files require retrieval.

- Questions requiring recent information, news, trends, current events, latest releases or market updates require web search.

- If both are needed, return both true.

Examples:

Query:
"What is InsightPilot?"

{
  "useRetrieval": true,
  "useWeb": false
}

Query:
"What are the latest AI trends?"

{
  "useRetrieval": false,
  "useWeb": true
}

Query:
"Compare my InsightPilot project with current AI trends"

{
  "useRetrieval": true,
  "useWeb": true
}

User Query:
${query}

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

                temperature: 0
            });

        const content =
            response.choices[0]
            .message.content;

        const decision =
            JSON.parse(content);

        console.log(
            decision
        );

        return {

            query,

            useRetrieval:
                decision.useRetrieval,

            useWeb:
                decision.useWeb
        };
    },

    {
        name:
        "Supervisor Agent"
    }
);

export default supervisorAgent;