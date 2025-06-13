import Url from "../models/Url.js";
import Visit from "../models/Visit.js";
const getAnalytics = async (req, res) => {
  try {
    console.log('req body is ', req.body);
    const { code } = req.params;
    const userid = req.body.userid;
    console.log("Analytics request for code:", code, "by user:", userid);
    if (!code || !userid) {
      return res.status(400).json({ error: "Short code and user ID are required." });
    }
    const urlDoc = await Url.findOne({ shortCode: code, userId:userid });
    if (!urlDoc) return res.status(404).json({ error: "Short URL not found or unauthorized." });

    const visits = await Visit.find({ urlId: urlDoc._id });
    if (!visits || visits.length === 0) {
      return res.status(401).json({
        error: "No visits found for this URL.",
      });
    }
    const deviceStats = visits.reduce((acc, v) => {
      acc[v.deviceType] = (acc[v.deviceType] || 0) + 1;
      return acc;
    }, {});
    if (Object.keys(deviceStats).length === 0) {
      return res.status(401).json({
        error: "No device type data available for this URL.",
      });
    }
    const referrerCount = {};
    visits.forEach((v) => {
      referrerCount[v.referrer] = (referrerCount[v.referrer] || 0) + 1;
    });
    if (Object.keys(referrerCount).length === 0) {
      return res.status(401).json({ error: "No referrer data available for this URL." });
    }
    const topReferrers = Object.entries(referrerCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([referrer, count]) => ({ referrer, count }));

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
const getAllAnalytics = async (req, res) => {
  try {
    const userId = req.body.userid;
    const urls = await Url.find({ userId });

    const analytics = await Promise.all(urls.map(async (url) => {
      const visits = await Visit.find({ urlId: url._id });

      const deviceStats = visits.reduce((acc, v) => {
        acc[v.deviceType] = (acc[v.deviceType] || 0) + 1;
        return acc;
      }, {});

      const referrerCount = {};
      visits.forEach((v) => {
        referrerCount[v.referrer] = (referrerCount[v.referrer] || 0) + 1;
      });

      const topReferrers = Object.entries(referrerCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([referrer, count]) => ({ referrer, count }));

      const dailyCounts = {};
      visits.forEach((v) => {
        const day = new Date(v.timestamp).toISOString().split("T")[0];
        dailyCounts[day] = (dailyCounts[day] || 0) + 1;
      });

      return {
        originalUrl: url.originalUrl,
        shortCode: url.shortCode,
        totalVisits: url.visitCount,
        uniqueVisitors: url.uniqueVisitors,
        tags: url.tags,
        deviceTypeBreakdown: deviceStats,
        referrers: topReferrers,
        timeSeries: dailyCounts,
      };
    }));

    return res.status(200).json(analytics);
  } catch (err) {
    console.error("[getAllAnalytics]", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
export { getAnalytics, getAllAnalytics };