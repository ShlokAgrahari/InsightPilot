import mongoose from "mongoose";

const chatSchema =
new mongoose.Schema({

    userId: {

        type:
            mongoose.Schema.Types.ObjectId,

        required: true,

        index: true
    },

    role: {

        type: String,

        enum: [
            "user",
            "assistant"
        ],

        required: true
    },

    content: {

        type: String,

        required: true
    }

}, {

    timestamps: true
});

export default mongoose.model(
    "ChatHistory",
    chatSchema
);