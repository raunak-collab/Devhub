import mongoose, { Schema } from "mongoose";

const savedToolsSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true
    },
})

export const SavedTools = mongoose.models.SavedTools || mongoose.model('SavedTools', savedToolsSchema)