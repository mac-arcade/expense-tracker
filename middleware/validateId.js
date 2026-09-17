// Validate the expense ID route parameter before the request reaches the route handler
const validateId = (req, res, next) => {

    // Convert the ID from the URL parameter into a number
    const id = Number(req.params.id);

    // Reject the request if the ID cannot be converted to a valid number
    if (Number.isNaN(id)) {
        return res.status(400).json({
            success: false,
            message: "please enter valid id Number"
        });
    }

    // ID is valid, continue to the next middleware or route handler
    next();

};

// Export the validation middleware for use in expense routes
module.exports = validateId;