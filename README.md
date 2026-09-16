# Expense Tracker API

A small Express.js project built to practice **custom middleware** and basic REST API development.

## Project Goal

The main goal of this project is to practice different types of middleware in Express, including:

* Global middleware
* Route-level middleware
* Validation middleware
* API key authentication middleware
* Request logging middleware

The project will also reinforce:

* Express routing
* HTTP methods
* Route parameters
* JSON request bodies
* Status codes
* Error handling
* Basic CRUD operations

## Technologies

* Node.js
* Express.js
* Nodemon
* JavaScript
* Postman / Thunder Client for API testing

## Planned Expense Structure

```json
{
  "id": 1,
  "title": "Lunch",
  "amount": 150,
  "category": "Food"
}
```

## Routes

### Home

`GET /`

Returns a basic message confirming that the Expense Tracker API is running.

### Get All Expenses

`GET /expenses`

Returns all expenses.

### Get Expense by ID

`GET /expenses/:id`

Returns a specific expense using its ID.

### Add Expense

`POST /expenses`

Adds a new expense.

Example request body:

```json
{
  "title": "Lunch",
  "amount": 150,
  "category": "Food"
}
```

### Delete Expense

`DELETE /expenses/:id`

Deletes an expense using its ID.

## Custom Middleware

The project will include the following custom middleware:

### Logger Middleware

Logs information about incoming requests, such as:

```text
GET /
GET /expenses
POST /expenses
```

### Expense Validation Middleware

Checks whether required expense fields such as `title`, `amount`, and `category` are present before allowing a new expense to be created.

### API Key Middleware

Checks for a valid API key before allowing access to protected expense routes.

Example header:

```text
x-api-key: 12345
```

## Scripts

Start the application:

```bash
npm start
```

Start the application using Nodemon:

```bash
npm run dev
```

## Current Status

* Express project initialized
* Express server running
* JSON body parsing enabled
* Home route created
* Custom middleware implementation next
