// middlewares/requestLogger.js

const requestLoggerMiddleware = (req, res, next) => {
    const timestamp = new Date().toISOString();
    const method = req.method;
    const url = req.url;
  
    console.log(`${timestamp} - ${method} ${url}`);
  
    next(); // Continue processing the request
  };
  
  module.exports = requestLoggerMiddleware;
  