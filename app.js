const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const data = require("./api/config/data");
const response = require("./api/utils/response");

/* Import routes */
const authRoutes = require("./api/routes/auth");

/* Connect db */
mongoose.connect(data.mongo_db, { useNewUrlParser: true });

/* Middleware */
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/* Use imported routes in the app */
app.use("/auth", authRoutes);

/* Handle invalid routes */
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

/* Catch invalid router errors */
app.use((error, req, res, next) => {
  response(res, error.status || 500, error.message);
});

/* Export module */
module.exports = app;
