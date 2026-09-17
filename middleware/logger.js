// Log basic information about every incoming request
const logger = (req, res, next) => {

    // Get the current local time for the request log
    const time = new Date().toLocaleTimeString();

    // Print request time, HTTP method, and URL in the terminal
    console.log(`[${time}] ${req.method} ${req.url}`);

    // Continue to the next middleware or route handler
    next();
};

// Export the logger middleware so it can be used in index.js
module.exports = logger;