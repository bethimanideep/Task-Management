const express = require('express')
const connection = require('./config/db')
const rateLimit = require('express-rate-limit');

const userRoute = require('./routes/userRoute');
const taskRoute = require('./routes/task.Route');

require('dotenv').config()
const app = express()
app.use(express.json())

// Define a rate limiting middleware
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 50, // Maximum 100 requests per windowMs
    message: 'Too many requests, please try again later.',
});

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