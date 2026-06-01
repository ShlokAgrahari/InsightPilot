import { pipeline } from "@xenova/transformers";

let extractor;

const embedText = async (text) => {

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
};

export default embedText;