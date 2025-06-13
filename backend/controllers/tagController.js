import Url from "../models/Url.js";
export const getUrlsByTag = async (req, res) => {
  try {
    const { tag } = req.params;
    const urls = await Url.find({ tags: tag });
    const response = urls.map((u) => ({
      shortCode: u.shortCode,
      shortUrl: `${req.protocol}://${req.get("host")}/${u.shortCode}`,
      originalUrl: u.originalUrl,
      totalVisits: u.visitCount,
      uniqueVisitors: u.uniqueVisitors,
      tags: u.tags,
    }));

    return res.status(200).json({
      count: response.length,
      urls: response,
    });
  } catch (err) {
    console.error("[getUrlsByTag]", err);
    return res.status(500).json({ error: "Server error" });
  }
};
