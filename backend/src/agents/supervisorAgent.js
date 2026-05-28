import {
  traceable
} from "langsmith/traceable";

const WEB_KEYWORDS = [

  "latest",
  "today",
  "current",
  "recent",
  "news",
  "update",
  "updated",
  "2025",
  "2026",
  "trend",
  "trending",
  "pricing",
  "release",
  "released",
  "announcement",
  "market",
  "stock",
  "live",
  "breaking"
];

const RETRIEVAL_KEYWORDS = [

  "my",
  "mine",
  "uploaded",
  "document",
  "documents",
  "pdf",
  "resume",
  "project",
  "notes",
  "report",
  "assignment",
  "research",
  "file",
  "presentation",
  "ppt",
  "proposal"
];

const supervisorAgent = traceable(

  async (state) => {

    console.log(
      "Supervisor Agent Running"
    );

    const query =
      state.query
      ?.toLowerCase()
      ?.trim() || "";

    let webScore = 0;

    let retrievalScore = 0;

    // WEB SCORING
    for (const keyword of WEB_KEYWORDS) {

      if (query.includes(keyword)) {

        webScore++;
      }
    }

    // RETRIEVAL SCORING
    for (const keyword of RETRIEVAL_KEYWORDS) {

      if (query.includes(keyword)) {

        retrievalScore++;
      }
    }

    let useWeb = false;

    let useRetrieval = false;

    // DECISION LOGIC

    // BOTH
    if (
      webScore > 0 &&
      retrievalScore > 0
    ) {

      useWeb = true;

      useRetrieval = true;
    }

    // ONLY WEB
    else if (
      webScore > 0
    ) {

      useWeb = true;
    }

    // ONLY RETRIEVAL
    else if (
      retrievalScore > 0
    ) {

      useRetrieval = true;
    }

    // DEFAULT FALLBACK
    else {

      useRetrieval = true;
    }

    console.log({

      query,

      webScore,

      retrievalScore,

      useWeb,

      useRetrieval
    });

    return {

      query,

      useWeb,

      useRetrieval,

      routingMetadata: {

        webScore,

        retrievalScore,

        routeChosen:

          useWeb && useRetrieval
            ? "hybrid"

          : useWeb
            ? "web"

          : "retrieval"
      }
    };
  },

  {
    name:
      "Supervisor Agent"
  }
);

export default supervisorAgent;