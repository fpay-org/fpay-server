const express = require("express");
const app = express();

/* Import routes */
const fineRoutes = require("./api/routes/fines");

/* Use imported routes in the app */
app.use("/fines", fineRoutes);

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

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
