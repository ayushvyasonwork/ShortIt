export const validateShortCode = (req, res, next) => {
  const { customCode } = req.body;

  if (customCode) {
    const isValid = /^[a-zA-Z0-9_-]{4,20}$/.test(customCode);
    if (!isValid) {
      return res.status(400).json({
        error:
          "Custom short code must be 4–20 characters long and contain only letters, numbers, hyphens, or underscores.",
      });
    }
  }

  next();
};
