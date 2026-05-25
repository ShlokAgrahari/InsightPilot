const chunkText = (
    text,
    chunkSize = 800,
    overlap = 150
) => {

    const chunks = [];

    let start = 0;

    while (start < text.length) {

        const end = start + chunkSize;

        chunks.push(
            text.slice(start, end)
        );

        start += chunkSize - overlap;
    }

    return chunks;
};

export default chunkText;