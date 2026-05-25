import fs from "fs";
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const pdfParse = require('pdf-parse');

const parsePDF = async (filePath) => {
    // 1. Check if file exists and has size
    const stats = fs.statSync(filePath);
    if (stats.size === 0) {
        throw new Error("File is empty (0 bytes)");
    }

    // 2. Read the file into a buffer
    const dataBuffer = fs.readFileSync(filePath);

    // 3. Verify buffer has content
    if (!dataBuffer || dataBuffer.length === 0) {
        throw new Error("Buffer is empty");
    }

    // 4. Parse
    try {
        const data = await pdfParse(dataBuffer);
        return data.text;
    } catch (err) {
        console.error("PDF Parse Library Error:", err);
        throw err;
    }
};

export default parsePDF;