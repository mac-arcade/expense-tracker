const apiChecker = (req, res, next) => {

    // const apiKey = req.headers["x-api-key"];
    const apiKey = req.header("x-api-key");

    if (!apiKey || apiKey !== "12345") {

        return res.status(401).json({
            success: false,
            message: "api key is missing or incorrect, please use correct api key"
        });
    }

    next();
}

module.exports = apiChecker;