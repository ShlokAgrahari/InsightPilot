import fs from "fs";

import cloudinary from
"../config/cloudinary.js";

import Document from
"../models/Document.js";

import parsePDF from
"../parsers/pdfParser.js";

import chunkText from
"../utils/chunkText.js";

import embedText from
"../services/embedText.js";

import storeChunks from
"../services/storeChunks.js";

export const uploadDocument =
async (req, res) => {

  try {

    console.log("REQUEST RECEIVED");

    // CHECK FILE
    if (!req.file) {

      return res.status(400).json({

        success: false,

        message:
        "No file uploaded"
      });
    }

    console.log("FILE RECEIVED");

    console.log(req.file);

    // CLOUDINARY UPLOAD
    console.log(
      "STARTING CLOUDINARY UPLOAD"
    );

    const result =
    await cloudinary
    .uploader.upload(

      req.file.path,

      {
        resource_type:
        "image",

        folder:
        "insightpilot_pdfs"
      }
    );

    console.log(
      "CLOUDINARY DONE"
    );

    console.log(result.secure_url);

    // PDF PARSE
    console.log(
      "STARTING PDF PARSE"
    );

    const extractedText =
    await parsePDF(
      req.file.path
    );

    console.log(
      "PDF PARSE DONE"
    );

    console.log(
      extractedText.slice(0, 200)
    );

    // CHUNKING
    console.log(
      "STARTING CHUNKING"
    );

    const chunks =
    chunkText(
      extractedText
    );

    console.log(
      "CHUNKING DONE"
    );

    console.log(
      "TOTAL CHUNKS:",
      chunks.length
    );

    // EMBEDDINGS
    console.log(
      "STARTING EMBEDDINGS"
    );

    const embeddings = [];

    for (const chunk of chunks) {

      const embedding =
      await embedText(chunk);

      embeddings.push(
        embedding
      );
    }

    console.log(
      "EMBEDDINGS DONE"
    );

    // STORE IN WEAVIATE
    console.log(
      "STORING IN WEAVIATE"
    );

    await storeChunks(

      chunks,

      embeddings,

      req.file.originalname,

      req.user._id.toString()
    );

    console.log(
      "WEAVIATE STORE DONE"
    );

    // STORE DOC METADATA
    console.log(
      "SAVING DOC IN MONGO"
    );

    const document =
    await Document.create({

      user:
      req.user._id,

      fileName:
      req.file.originalname,

      cloudinaryUrl:
      result.secure_url,

      publicId:
      result.public_id
    });

    console.log(
      "MONGO SAVE DONE"
    );

    // DELETE LOCAL FILE
    fs.unlinkSync(
      req.file.path
    );

    console.log(
      "LOCAL FILE DELETED"
    );

    return res.status(200).json({

      success: true,

      message:
      "PDF uploaded successfully",

      document,

      totalChunks:
      chunks.length
    });

  } catch (error) {

    console.log(
      "UPLOAD ERROR:"
    );

    console.log(error);

    return res.status(500).json({

      success: false,

      message:
      error.message
    });
  }
};

export const getDocuments =
async (req, res) => {

  try {

    const documents =
    await Document.find({

      user:
      req.user._id
    })

    .sort({
      createdAt: -1
    });

    res.status(200).json({

      success: true,

      documents
    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message:
      error.message
    });
  }
};