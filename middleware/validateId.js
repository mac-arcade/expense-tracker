const validateId = (req, res, next) => {

    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
        return res.status(400).json({
            success: false,
            message: "please enter valid id Number"
        });
    }

    next();

}

module.exports = validateId;