import mongoose, { Schema } from "mongoose";

const collectionSchema = new mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },

    desc: {
      type: String,
      default: "",
      trim: true,
    },

    icon: {
      name: {
        type: String,
        required: true,
      },

      color: {
        type: String,
        required: true,
      },
    },

    tools: [
      {
        type: String,
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Collection =
  mongoose.models.Collection ||
  mongoose.model("Collection", collectionSchema);

export default Collection;