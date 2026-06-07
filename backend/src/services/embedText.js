import { pipeline } from "@xenova/transformers";
import { traceable } from "langsmith/traceable";

let extractor;

const embedText = traceable(
    async (text) => {

        if (!extractor) {

            console.log(
                "Loading multilingual embedding model..."
            );

            extractor = await pipeline(
                "feature-extraction",
                "Xenova/paraphrase-multilingual-MiniLM-L12-v2"
            );

            console.log(
                "Multilingual model loaded"
            );
        }

        const output = await extractor(
            text,
            {
                pooling: "mean",
                normalize: true
            }
        );

        return Array.from(
            output.data
        );
    },
    {
        name: "embed-text service"
    }
);

export default embedText;