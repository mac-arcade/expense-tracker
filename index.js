// Import express
const express = require("express");

// Create express application
const app = express();

// Give PORT number
const port = process.env.port || 3000;

const expenseRouter = require("./routes/expenses")

const logger = require("./middleware/logger");

const apiChecker = require("./middleware/apiChecker");

// Middleware to parse json
app.use(express.json());

// Custom middleware to log 
app.use(logger);

// redirect to expense routes
app.use("/expenses", apiChecker, expenseRouter);


// Default home route
app.get("/", (req, res) => {
    res.status(200).send("Expense Tracker API");
});

app.use((req, res) => {
    return res.status(404).json({
        message: `This route does not exists`
    });
});

// Start app
app.listen(port, () => {
    console.log(`Server is started at http://localhost:${port}`);
})