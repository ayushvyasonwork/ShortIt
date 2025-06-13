import mongoose from "mongoose";

const visitSchema = new mongoose.Schema({
  urlId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Url",
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  ipAddress: {
    type: String,
    required: true,
  },
  userAgent: {
    type: String,
    required: true,
  },
  deviceType: {
    type: String,
    enum: ["desktop", "mobile", "tablet", "unknown"],
    default: "unknown",
  },
  referrer: {
    type: String,
    default: "direct",
  },
  fingerprint: {
    type: String,
    required: true, // Hash of IP + User-Agent for unique visitor detection
  },
});

const Visit = mongoose.model("Visit", visitSchema);

export default Visit; // ✅ ES Module export
