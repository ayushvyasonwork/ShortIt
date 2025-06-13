import Url from "../models/Url.js";
import Visit from "../models/Visit.js";
export const getAnalytics = async (req, res) => {
  try {
    const { code } = req.params;
    const urlDoc = await Url.findOne({ shortCode: code });
    if (!urlDoc) return res.status(404).json({ error: "Short URL not found." });
    const visits = await Visit.find({ urlId: urlDoc._id });

    // Aggregate device breakdown
    const deviceStats = visits.reduce((acc, v) => {
      acc[v.deviceType] = (acc[v.deviceType] || 0) + 1;
      return acc;
    }, {});

    // Aggregate referrers (Top 5)
    const referrerCount = {};
    visits.forEach((v) => {
      referrerCount[v.referrer] = (referrerCount[v.referrer] || 0) + 1;
    });
    const topReferrers = Object.entries(referrerCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([referrer, count]) => ({ referrer, count }));

    // Time series (visits per day)
    const dailyCounts = {};
    visits.forEach((v) => {
      const day = new Date(v.timestamp).toISOString().split("T")[0];
      dailyCounts[day] = (dailyCounts[day] || 0) + 1;
    });

    return res.status(200).json({
      originalUrl: urlDoc.originalUrl,
      shortCode: urlDoc.shortCode,
      totalVisits: urlDoc.visitCount,
      uniqueVisitors: urlDoc.uniqueVisitors,
      tags: urlDoc.tags,
      deviceTypeBreakdown: deviceStats,
      referrers: topReferrers,
      timeSeries: dailyCounts,
    });
  } catch (err) {
    console.error("[getAnalytics]", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
