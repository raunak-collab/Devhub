import mongoose, { Schema } from "mongoose";

const sessionSchema = mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: (60 * 60) * 24
    }
})

export const Session = mongoose.models.Session || mongoose.model('Session', sessionSchema)