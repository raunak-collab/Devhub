import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: function () {
        return this.provider === "credentials";
      },
    },
    provider: {
      type: String,
      enum: ["credentials", "google", "github"],
      required: true,
    },
    providerAccountId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Same provider account cannot create duplicate users
userSchema.index(
  { provider: 1, providerAccountId: 1 },
  { unique: true }
);

// Normal registration email must be unique among credentials users
userSchema.index(
  { email: 1 },
  {
    unique: true,
    partialFilterExpression: {
      provider: "credentials",
    },
  }
);

export const User =
  mongoose.models.User ||
  mongoose.model("User", userSchema);