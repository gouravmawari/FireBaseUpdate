const express = require("express");
const app = express();
app.use(express.json());
const signRoutes = require("./routes/sign.route");
app.use("/api", signRoutes);


module.exports = app;
