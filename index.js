// Import Express framework
const express = require("express");

// Create the main Express application
const app = express();

// Use environment PORT if available, otherwise use port 3000
const port = process.env.port || 3000;

// Import expense routes
const expenseRouter = require("./routes/expenses");

// Import custom request logger middleware
const logger = require("./middleware/logger");

// Import API key authentication middleware
const apiChecker = require("./middleware/apiChecker");

// Parse incoming JSON request bodies and make the data available in req.body
app.use(express.json());

// Log incoming requests before they reach the application routes
app.use(logger);

// Protect all /expenses routes with API key validation,
// then forward valid requests to the expense router
app.use("/expenses", apiChecker, expenseRouter);

// Public home route used to confirm that the API is running
app.get("/", (req, res) => {
    res.status(200).send("Expense Tracker API");
});

// Fallback handler for requests that do not match any existing route
app.use((req, res) => {
    return res.status(404).json({
        message: `This route does not exist`
    });
});

// Start the server and listen for incoming requests
app.listen(port, () => {
    console.log(
        `Server is started at http://localhost:${port}`
    );
});

