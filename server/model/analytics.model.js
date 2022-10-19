import mongoose, { Document } from "mongoose";
import shortUrl from "./shortModel.js";

const schema = new mongoose.Schema(
  {
    shortUrl: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "shortUrl",
      required: true,
    },
  },
  { timestamps: true }
);

const analytics = mongoose.model("analytics", schema);

export default analytics;
