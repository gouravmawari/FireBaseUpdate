const express = require("express");
const app = express();
const errorHandler = (req, res, next) => {
    res.sendError = (error) => {
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || "An unexpected error occurred",
            errorCode: error.errorCode || "UNKNOWN_ERROR",
            details: error.details || null,
        });
    };
    next();
};
app.use(errorHandler);
app.use(express.json());
const All = require("./routes");
app.use("/api", All);


module.exports = app;
