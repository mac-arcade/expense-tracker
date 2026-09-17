// Check whether the request contains the required API key
const apiChecker = (req, res, next) => {

    // Read the custom API key from the request headers
    const apiKey = req.header("x-api-key");

    // Reject the request if the API key is missing or incorrect
    if (!apiKey || apiKey !== "12345") {
        return res.status(401).json({
            success: false,
            message: "api key is missing or incorrect, please use correct api key"
        });
    }

    // API key is valid, continue to the next middleware or route handler
    next();
};

// Export the API key middleware for use in protected routes
module.exports = apiChecker;