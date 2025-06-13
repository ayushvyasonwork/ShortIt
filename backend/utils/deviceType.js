import { UAParser } from "ua-parser-js";

export const getDeviceType = (userAgent) => {
  try {
    const parser = new UAParser(userAgent);
    const device = parser.getDevice();
    const type = device.type;

    if (type === "mobile") return "mobile";
    if (type === "tablet") return "tablet";
    if (!type) return "desktop";

    return "unknown";
  } catch (err) {
    return "unknown";
  }
};
