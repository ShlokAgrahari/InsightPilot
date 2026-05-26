import tavilyClient from
"../config/tavily.js";

const webAgent = async (
    state
) => {

    console.log(
        "Web Agent Started"
    );

    const response =
        await tavilyClient.search(

            state.query,

            {
                searchDepth:
                    "advanced",

                maxResults: 3
            }
        );

    console.log(
        "Web Agent Finished"
    );

    const webResults =
        response.results.map(
            (item) => ({

                properties: {

                    source:
                        item.url,

                    text:
                        item.content
                }
            })
        );

    return {

        webResults
    };
};

export default webAgent;