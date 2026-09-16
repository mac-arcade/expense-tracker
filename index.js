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

// Middleware to parse json
app.use(express.json());

// Custom middleware to log 
app.use(logger);

// Default home route
app.get("/", (req, res) => {
    res.status(200).send("Expense Tracker API");
});

// Start app
app.listen(port, () => {
    console.log(`Server is started at http://localhost:${port}`);
})