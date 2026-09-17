// Import Express framework
const express = require("express");

// Create a router instance for expense-related routes
const router = express.Router();

// Import middleware to validate expense data before creating a new expense
const validateExpense = require("../middleware/validateExpense");

// Import middleware to validate numeric expense IDs
const validateId = require("../middleware/validateId");

// Load the initial expenses array from the JSON data file
const { expenses } = require("../data/expenses.json");

// GET /expenses
// Return all available expenses
router.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        data: expenses
    });
});

// GET /expenses/:id
// Validate the ID first, then return the matching expense
router.get("/:id", validateId, (req, res) => {

    // Convert the route parameter from string to number
    const id = Number(req.params.id);

    // Find the expense that matches the requested ID
    const expense = expenses.find((expense) => expense.id === id);

    // Return 404 if no expense exists with the given ID
    if (!expense) {
        return res.status(404).json({
            success: false,
            message: `Expense with id ${id} is not found`
        });
    }

    // Return the matching expense
    return res.status(200).json({
        success: true,
        data: expense
    });
});

// POST /expenses
// Validate the request body first, then create a new expense
router.post("/", validateExpense, (req, res) => {

    // Extract required expense data from the request body
    const { title, amount, category } = req.body;

    // Generate the next available ID using the highest existing expense ID
    const id = expenses.reduce(
        (max, expense) => expense.id > max ? expense.id : max,
        0
    ) + 1;

    // Create the new expense object
    const expense = { id, title, amount, category };

    // Add the new expense to the in-memory expenses array
    expenses.push(expense);

    // Return the newly created expense
    res.status(201).json({
        success: true,
        message: "New expense added successfully",
        data: expense
    });
});

// DELETE /expenses/:id
// Validate the ID first, then delete the matching expense
router.delete("/:id", validateId, (req, res) => {

    // Convert the route parameter from string to number
    const id = Number(req.params.id);

    // Find the array index of the expense with the requested ID
    const index = expenses.findIndex((expense) => expense.id === id);

    // Return 404 if no matching expense exists
    if (index === -1) {
        return res.status(404).json({
            success: false,
            message: `Expense with id ${id} is not found`
        });
    }

    // Remove the expense and store the deleted object
    const deletedExpense = expenses.splice(index, 1)[0];

    // Return information about the deleted expense
    res.status(200).json({
        success: true,
        message: `Expense with id ${id} is deleted successfully`,
        data: deletedExpense
    });

});

// Export the configured router so it can be mounted in index.js
module.exports = router;
