import generateQueries from "./generateQueries.js";
import searchChunks from "./searchChunks.js";

const multiQuerySearch = async (query) => {

    const queries =
        await generateQueries(query);

    const allResults = [];

    for (const q of queries) {

        const results =
            await searchChunks(q);

        allResults.push(...results);
    }

    const uniqueResults =
        Array.from(
            new Map(
                allResults.map(item => [
                    item.uuid,
                    item
                ])
            ).values()
        );

    return uniqueResults;
};

export default multiQuerySearch;