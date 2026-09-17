const validateExpense = (req, res, next) => {

    const { title, category } = req.body;

    const amount = Number(req.body.amount); 


    if (!title || Number.isNaN(amount) || !category) {
        return res.status(400).json({
            success: false,
            message: `Data Missing - title: ${title}, amount: ${amount}, category: ${category}`
        });
    }

    next();
}

module.exports = validateExpense;