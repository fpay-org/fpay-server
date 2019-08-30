const express = require("express");
const app = express();
const bodyParser = require("body-parser");

/* Import routes */
const fineRoutes = require("./api/routes/fines");

/* Use imported routes in the app */
app.use("/fines", fineRoutes);

/* Middleware */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/* Handle invalid routes */
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

/* Catch invalid router errors */
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

/* Export module */
module.exports = app;
