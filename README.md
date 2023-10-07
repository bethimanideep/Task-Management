# Task Management API [![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Overview

The Task Management API is a robust backend RESTful API developed using Node.js, Express.js, and MongoDB. It offers comprehensive functionality for managing tasks efficiently and securely. This API supports operations such as creating, retrieving, updating, and deleting tasks, along with optional features like user authentication, error handling, rate limiting, and middleware for enhanced performance.

### Backend Deploy
[Live Demo](https://task-management-six-lyart.vercel.app/)

### Swagger UI Docs
[API Documentation](https://task-management-six-lyart.vercel.app/api-docs/)

### Video Demonstration
[Watch Video]()

## .env

Before running the application, make sure to set the following environment variables in a `.env` file in the project root directory:
```
env
PORT=8000
MONGODBURL=your_mongodb_connection_url
SECRET=your_jwt_secret_key
```

## Installation
   ```bash
   git clone https://github.com/yourusername/Task-Management.git
   cd Task-Management
   npm install
   npm run server
   ```

## Table of Contents

- [Features](#features)
- [Endpoints](#endpoints)
- [Database](#database)
- [Error Handling](#error-handling)
- [Rate Limiting (Bonus)](#rate-limiting-bonus)
- [Middleware](#middleware)

## Features

### Endpoints

- *POST /tasks*: Create a new task.
- *GET /tasks*: Retrieve a list of all tasks.
- *GET /tasks/:id*: Retrieve a specific task by its ID.
- *PUT /tasks/:id*: Update a specific task by its ID.
- *DELETE /tasks/:id*: Delete a specific task by its ID.
- *POST /users/register*: Register a new user.
- *POST /users/login*: Log in as a registered user and obtain a JWT token for authentication.

### Task Structure

- Each task includes an ID, title, description, creation date, and status (e.g., pending, completed).

### Database

- MongoDB is employed as the database to store task data efficiently.
- Mongoose is used as the ODM tool to facilitate interactions with the MongoDB database.

### Error Handling

- The API gracefully handles potential errors, providing clear HTTP status codes and descriptive error messages.
- Users receive clear feedback in the event of errors during API interactions.

### Rate Limiting (Bonus)

- Rate limiting is implemented to prevent abuse and maintain server stability.
- Clients making an excessive number of requests in a short timeframe will receive error responses.

### Middleware

- Middleware is used to log API requests, capturing essential details about incoming requests and responses.
- This aids in performance monitoring and debugging.
