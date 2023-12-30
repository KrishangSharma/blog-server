// Simple JS authentication
const secretKey = process.env.API_SECRET;

// Middleware to check for valid API key
const authenticate = (req, res, next) => {
  const apiKey = req.headers["api-key"];

  // Check if the API key is valid
  if (apiKey && apiKey === secretKey) {
    next();
  } else {
    res.status(401).json({
      message:
        "Unauthorized! This is a protected route, made only to be accessible by the creator!",
    });
  }
};

module.exports = { authenticate };
