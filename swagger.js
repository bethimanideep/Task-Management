const swaggerJSDoc = require("swagger-jsdoc");
const path=require('path')

const options = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "Tacnique",
            version: "1.0.0",
            description: "This API provides comprehensive functionality for managing tasks. Users can create, retrieve, update, and delete tasks. Additionally, it offers user authentication for secure access to task management features. Explore the API endpoints to streamline your task management process."
        },
        servers: [
            {
                url: "https://task-management-six-lyart.vercel.app",
                description: "Deployed server",
            },
            {
                url: "http://localhost:8000",
                description: "Local server",
            },
        ],
    },
    apis: [path.join(__dirname, "swagger.yaml")],
};
const specs = swaggerJSDoc(options);
module.exports={specs}