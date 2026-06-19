import { traceable } from "langsmith/traceable";
import groq from "../config/groq.js";

/**
 * Traced LLM call
 */
const routerLLM = traceable(
  async (prompt) => {
    return await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0,
    });
  },
  {
    name: "Groq Router LLM",
    run_type: "llm",
  }
);

/**
 * Supervisor Agent
 */
const supervisorAgent = traceable(
  async (state) => {
    console.log("Supervisor Agent Running");

    const query = state.query;

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

    const response = await routerLLM(prompt);

    console.log(response.usage);

    const content = response.choices[0].message.content;

    let decision;

    try {
      decision = JSON.parse(content);
    } catch (err) {
      console.error("Failed to parse LLM response:", content);

      decision = {
        useRetrieval: false,
        useWeb: false,
      };
    }

    console.log("Routing Decision:", decision);

    return {
      query,
      useRetrieval: Boolean(decision.useRetrieval),
      useWeb: Boolean(decision.useWeb),
    };
  },
  {
    name: "Supervisor Agent",
  
  }
);

export default supervisorAgent;