const express = require('express')

const { specs } = require('./swagger');
const swaggerUI = require("swagger-ui-express");
const rateLimit = require('express-rate-limit');

const connection = require('./config/db')
const userRoute = require('./routes/userRoute');
const taskRoute = require('./routes/task.Route');
const errorHandlerMiddleware = require('./middlewares/errorHandler');
const requestLoggerMiddleware = require('./middlewares/requestLogger');

require('dotenv').config()
const app = express()
app.use(express.json())
app.use(require('cors')())

//Middlewares
app.use(requestLoggerMiddleware);
app.use(errorHandlerMiddleware)

// Define a rate limiting middleware
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 50, // Maximum 100 requests per windowMs
    message: 'Too many requests, please try again later.',
});

//swagger config
const CSS_URL ="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";
app.use(
    "/api-docs",
    swaggerUI.serve,
    swaggerUI.setup(specs, { customCssUrl: CSS_URL })
);

// Apply rate limiting to specific routes
app.use('/tasks', limiter);

//Routes
app.use('/user', userRoute)
app.use('/tasks', taskRoute)

app.get('/', (req, res) => {
    res.json('welcome')
})

app.listen(process.env.PORT||8000, async () => {
    try {
        await connection
        console.log('connected to db');
        console.log(`server is running at ${process.env.PORT}`);
    } catch (error) {
        console.log(error);
    }
})