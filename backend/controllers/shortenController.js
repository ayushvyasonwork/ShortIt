import Url from "../models/Url.js";

import { nanoid } from "nanoid";
export const createShortUrl = async (req, res) => {
  try {
    const { originalUrl, customCode, tags = [], expiry } = req.body;
    const userId = req.user._id;

    const shortCode = customCode || nanoid(6);
    const existing = await Url.findOne({ shortCode });
    if (existing) return res.status(409).json({ error: "Custom code already in use." });

    const expiryDate = expiry ? new Date(expiry) : null;

    const newUrl = new Url({
      originalUrl,
      shortCode,
      tags,
      expiryDate,
      userId,
    });

    await newUrl.save();

    return res.status(201).json({
      message: "Short URL created successfully.",
      shortUrl: `${req.protocol}://${req.get("host")}/${shortCode}`,
      shortCode,
    });
  } catch (error) {
    console.error("[createShortUrl]", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

