import {
    StateGraph,
    START,
    END
} from "@langchain/langgraph";

import supervisorAgent from
"../agents/supervisorAgent.js";

import retrievalAgent from
"../agents/retrievalAgent.js";

import webAgent from
"../agents/webAgent.js";

import mergeAgent from
"../agents/mergeAgent.js";

import rerankerAgentNode from
"../agents/rerankerAgentNode.js";

import answerAgent from
"../agents/answerAgent.js";

import reflectionAgent from
"../agents/reflectionAgent.js";

import citationValidatorAgent from
"../agents/citationValidatorAgent.js";

import memoryAgent from
"../agents/memoryAgent.js";

const workflow = new StateGraph({

    channels: {

        query: null,

        useWeb: null,

        useRetrieval: null,

        retrievedChunks: null,

        webResults: null,

        mergedResults: null,

        rerankedChunks: null,

        finalAnswer: null,

        chatHistory: null,

        userId: null
    }
});

workflow.addNode(
    "supervisor",
    supervisorAgent
);

workflow.addNode(
    "retrieval",
    retrievalAgent
);

workflow.addNode(
    "web",
    webAgent
);

workflow.addNode(
    "merge",
    mergeAgent
);

workflow.addNode(
    "reranker",
    rerankerAgentNode
);

workflow.addNode(
    "answer",
    answerAgent
);

workflow.addNode(
    "reflection",
    reflectionAgent
);

workflow.addNode(
    "citationValidator",
    citationValidatorAgent
);

workflow.addNode(
    "memory",
    memoryAgent
);

workflow.addEdge(
    START,
    "supervisor"
);

workflow.addConditionalEdges(

    "supervisor",

    (state) => {

        if (
            state.useWeb &&
            state.useRetrieval
        ) {

            return [
                "retrieval",
                "web"
            ];
        }

        if (state.useWeb) {

            return [
                "web"
            ];
        }

        return [
            "retrieval"
        ];
    }
);

workflow.addEdge(
    "retrieval",
    "merge"
);

workflow.addEdge(
    "web",
    "merge"
);

workflow.addEdge(
    "merge",
    "reranker"
);

workflow.addEdge(
    "reranker",
    "answer"
);

workflow.addEdge(
    "answer",
    "reflection"
);

workflow.addEdge(
    "reflection",
    "citationValidator"
);

workflow.addEdge(
    "citationValidator",
    "memory"
);

workflow.addEdge(
    "memory",
    END
);

const graph =
    workflow.compile();

export default graph;