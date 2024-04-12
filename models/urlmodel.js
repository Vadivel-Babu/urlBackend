import mongoose from "mongoose";

const urlSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  url: {
    type: String,
  },
  shorturl: {
    type: String,
  },
});

export const Url = mongoose.model("Url", urlSchema);
