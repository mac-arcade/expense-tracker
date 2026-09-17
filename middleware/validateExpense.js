// Validate required expense data before allowing the request to continue
const validateExpense = (req, res, next) => {

    // Extract text fields from the request body
    const { title, category } = req.body;

    // Convert amount to a number so numeric validation can be performed
    const amount = Number(req.body.amount);

    // Reject the request if required fields are missing
    // or if amount cannot be converted to a valid number
    if (!title || Number.isNaN(amount) || !category) {
        return res.status(400).json({
            success: false,
            message: `Data Missing - title: ${title}, amount: ${amount}, category: ${category}`
        });
    }

    // Validation passed, continue to the next middleware or route handler
    next();
};

// Export the validation middleware for use in expense routes
module.exports = validateExpense;
