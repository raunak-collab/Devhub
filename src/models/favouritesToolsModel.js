import mongoose, { Schema } from "mongoose";

const favouritesToolsSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true
    },
})

export const FavouritesTools = mongoose.models.FavouritesTools || mongoose.model('FavouritesTools', favouritesToolsSchema)