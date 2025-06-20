import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
  originalUrl: {
    type: String,
    required: true,
  },
  shortCode: {
    type: String,
    required: true,
    unique: true,
  },
  tags: {
    type: [String],
    default: [],
  },
  expiryDate: {
    type: Date,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  visitCount: {
    type: Number,
    default: 0,
  },
  uniqueVisitors: {
    type: Number,
    default: 0,
  },
  userId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  required: true,
},
});

const Url = mongoose.model("Url", urlSchema);

export default Url; // ✅ Proper ES Module export
