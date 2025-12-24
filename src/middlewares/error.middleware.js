// middlewares/error.middleware.js
const errorHandler = (err, req, res, next) => {
    let { statusCode, message } = err;
  
    // Default to 500 if status code is not provided
    if (!statusCode) statusCode = 500;
  
    const response = {
      success: false,
      message,
      // Only include stack trace in development mode
      ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    };
  
    res.status(statusCode).json(response);
  };
  
  export { errorHandler };
  