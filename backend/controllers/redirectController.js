import Url from "../models/Url.js";
import Visit from "../models/Visit.js";

import { getDeviceType } from "../utils/deviceType.js";
import { generateFingerprint } from "../utils/fingerprint.js";
export const handleRedirect = async (req, res) => {
  try {
    const shortCode = req.params.code;
    const urlDoc = await Url.findOne({ shortCode });
    if (!urlDoc) return res.status(404).send("Short URL not found.");
    const nowDate = new Date();
    console.log("Current Date:", nowDate);
    console.log("Expiry Date:", urlDoc.expiryDate);
    if (urlDoc.expiryDate && nowDate > urlDoc.expiryDate)
      return res.status(410).send("This URL has expired.");

    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    const userAgent = req.headers["user-agent"];
    const deviceType = getDeviceType(userAgent);
    const ref = req.get("Referrer") || req.get("Referer") || req.get("referer") || req.get("referrer"); 
    console.log("Referrer:", ref);
    const referrer = ref ? new URL(ref).hostname:"direct";
     // Extract hostname or use "direct"
    const fingerprint = generateFingerprint(ip, userAgent);

    const isUnique = !(await Visit.findOne({
      urlId: urlDoc._id,
      fingerprint,
    }));

    // Save visit
    await Visit.create({
      urlId: urlDoc._id,
      ipAddress: ip,
      userAgent,
      deviceType,
      referrer,
      fingerprint,
    });

    // Update counters
    urlDoc.visitCount += 1;
    if (isUnique) urlDoc.uniqueVisitors += 1;
    await urlDoc.save();

    return res.redirect(302, urlDoc.originalUrl);
  } catch (error) {
    console.error("[handleRedirect]", error);
    return res.status(500).send("Server error");
  }
};