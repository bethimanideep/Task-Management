// middlewares/errorHandler.js

const errorHandlerMiddleware = (err, req, res, next) => {
    // Determine the status code based on the error type
    let statusCode;
    let errorMessage;
  
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
      // Handle JSON parsing errors (e.g., invalid JSON in request body)
      statusCode = 400;
      errorMessage = 'Invalid JSON';
    } else {
      // Handle other errors with a default status code of 500 (Internal Server Error)
      statusCode = err.statusCode || 500;
      errorMessage = err.message || 'Internal Server Error';
    }
  
    // Log the error
    console.error(err);
  
    res.status(statusCode).json({ error: errorMessage });
  };
  
  module.exports = errorHandlerMiddleware;
  