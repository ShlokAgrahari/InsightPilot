import fs from "fs";
import { createRequire } from "module";

const require = createRequire(import.meta.url);

const pdfParse = require("pdf-parse");

const parsePDF = async (filePath) => {

    try {

        const stats =
            await fs.promises.stat(filePath);

        if (stats.size === 0) {

            throw new Error(
                "PDF file is empty"
            );
        }

        const dataBuffer =
            await fs.promises.readFile(
                filePath
            );

        if (
            !dataBuffer ||
            dataBuffer.length === 0
        ) {

            throw new Error(
                "PDF buffer empty"
            );
        }

        const data =
            await pdfParse(dataBuffer);

        if (!data.text?.trim()) {

            throw new Error(
                "No extractable text found"
            );
        }

        return data.text;

    } catch (error) {

        console.log(
            "PDF Parsing Error:",
            error
        );

        throw error;
    }
};

export default parsePDF;