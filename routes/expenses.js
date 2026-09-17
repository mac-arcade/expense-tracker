const express = require("express");

const router = express.Router();

const validateExpense = require("../middleware/validateExpense");

const validateId = require("../middleware/validateId");

const {expenses} = require("../data/expenses.json");

router.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        data: expenses
    });
});

router.get("/:id", validateId, (req, res) => {

    const id = Number(req.params.id);

    const expense = expenses.find((expense) => expense.id === id);

    if (!expense) {
        return res.status(404).json({
            success: false,
            message: `Expense with id ${id} is not found`
        });
    }

    return res.status(200).json({
        success: true,
        data: expense
    });
});

router.post("/", validateExpense, (req, res) => {

    const { title, amount, category } = req.body;

    const id = expenses.reduce((max, expense) => expense.id > max ? expense.id : max, 0) + 1;

    const expense = { id, title, amount, category };

    expenses.push(expense);

    res.status(201).json({
        success: true,
        message: "New expense added successfully",
        data: expense
    });
});

router.delete("/:id", validateId, (req, res) => {

    const id = Number(req.params.id);

    const index = expenses.findIndex((expense) => expense.id === id);

    if (index === -1) {
        return res.status(404).json({
            success: false,
            message: `Expense with id ${id} is not found`
        });
    }

    const deletedExpense = expenses.splice(index, 1)[0];

    res.status(200).json({
        success: true,
        message: `Expense with id ${id} is deleted successfully`,
        data: deletedExpense
    });

});

module.exports = router;