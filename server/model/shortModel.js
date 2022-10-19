import mongoose from "mongoose";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("abcdefghijklmlopqrstuvwxyz0123456789", 6);

const shortUrlModel = new mongoose.Schema({
  shortId: {
    type: String,
    unique: true,
    require: true,
    default: () => nanoid(),
  },
  destination: { type: String, require: true },
  countUrl: { type: Number, default: 0 },
});

const shortUrl = mongoose.model("shortUrl", shortUrlModel);
export default shortUrl;
