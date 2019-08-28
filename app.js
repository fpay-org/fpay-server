const express = require("express");
const app = express();

const fineRoutes = require("./api/routes/fines");

app.use("/fines", fineRoutes);

module.exports = app;
