const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

/* Import routes */
const fineRoutes = require("./api/routes/fines");
const userRoutes = require("./api/routes/user");

/* Connect db */
mongoose.connect(
  "mongodb+srv://server:fpaydb@cluster0-wedr9.gcp.mongodb.net/test?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);

/* Middleware */
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/* Use imported routes in the app */
app.use("/fines", fineRoutes);
app.use("/user", userRoutes);

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
