// Import express
const express = require("express");

// Create express application
const app = express();

// Give PORT number
const port = process.env.port || 3000;


const logger = (req, res, next) => {

    const time = new Date().toLocaleTimeString();

    console.log(`[${time}] ${req.method} ${req.url}`);

    next();
};

const validateExpense = (req, res, next) => {

    const { title, amount, category } = req.body;

    if (!title || amount == undefined || amount == "" || !category) {
        return res.status(400).json({
            success: false,
            message: `Data Missing - title: ${title}, amount: ${amount}, category: ${category}`
        });
    }

    next();
}

// Middleware to parse json
app.use(express.json());

// Custom middleware to log 
app.use(logger);

const expenses = [
    {
        id: 1,
        title: "Lunch",
        amount: 150,
        category: "Food"
    },
    {
        id: 2,
        title: "Bus Ticket",
        amount: 50,
        category: "Travel"
    },
    {
        id: 3,
        title: "Shoes",
        amount: 600,
        category: "Shopping"
    }
];

// Default home route
app.get("/", (req, res) => {
    res.status(200).send("Expense Tracker API");
});

app.get("/expenses", (req, res) => {
    res.status(200).json({
        success: true,
        data: expenses
    });
});

app.get("/expenses/:id", (req, res) => {

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

app.post("/expenses", validateExpense, (req, res) => {

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

// Start app
app.listen(port, () => {
    console.log(`Server is started at http://localhost:${port}`);
})