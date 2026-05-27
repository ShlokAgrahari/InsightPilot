import mongoose from "mongoose";

const documentSchema =
new mongoose.Schema({

    user: {

        type:
            mongoose.Schema.Types.ObjectId,

        ref: "User"
    },

    fileName: String,

    cloudinaryUrl: String,

    publicId: String,

    uploadedAt: {

        type: Date,

        default: Date.now
    }
});

export default mongoose.model(
    "Document",
    documentSchema
);