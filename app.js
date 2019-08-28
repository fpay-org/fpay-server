const express = require("express");
const app = express();

/* Import routes */
const fineRoutes = require("./api/routes/fines");

/* Use imported routes in the app */
app.use("/fines", fineRoutes);

/* Export module */
module.exports = app;
