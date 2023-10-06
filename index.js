const express = require('express')
const connection = require('./config/db')
const rateLimit = require('express-rate-limit');

const userRoute = require('./routes/userRoute');
const taskRoute = require('./routes/task.Route');
const swaggerUI = require("swagger-ui-express");
// const specs = require("./swagger");

require('dotenv').config()
const app = express()
app.use(express.json())

// Define a rate limiting middleware
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 50, // Maximum 100 requests per windowMs
    message: 'Too many requests, please try again later.',
});

const swaggerJsdoc = require("swagger-jsdoc");

const options = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "tacnique",
            version: "1.0.0",
            description:
                "Comprehensive API documentation for the E-Commerce platform, providing endpoints for user authentication, product management, shopping cart operations, orders, and more.",
        },
        servers: [
            {
                url: "",
                description: "Deployed server",
            },
            {
                url: "http://localhost:8000",
                description: "Local server",
            },
        ],
    },
    apis: ["./swagger.yaml"],
};
const specs = swaggerJsdoc(options);
//swagger config
const CSS_URL =
    "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";
app.use(
    "/api-docs",
    swaggerUI.serve,
    swaggerUI.setup(specs, { customCssUrl: CSS_URL })
);

// Apply rate limiting to specific routes
app.use('/tasks', limiter);

app.use('/user', userRoute)
app.use('/tasks', taskRoute)

app.get('/', (req, res) => {
    res.json('welcome')
})

app.listen(process.env.PORT, async () => {
    try {
        await connection
        console.log('connected to db');
        console.log(`server is running at ${process.env.PORT}`);
    } catch (error) {
        console.log(error);
    }
})