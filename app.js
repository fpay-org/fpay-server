const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const data = require("./api/config/data");
const response = require("./api/utils/response");

const morgan = require("morgan");

/* Import routes */
const routes = require("./api/routes");
/* Connect db */
mongoose
  .connect(
    "mongodb+srv://server:fpaydb@cluster0-wedr9.gcp.mongodb.net/test?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .catch(err => response(res, null, 500, err));

/* Middleware */
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan("dev"));

/* Import routes */
app.use("/v1", routes);

app.use("/", (req, res) => res.redirect("/v1"));

/* Handle invalid routes */
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

/* Catch invalid router errors */
app.use((error, req, res, next) => {
  response(res, null, error.status || 500, error.message);
});

/* Export module */
module.exports = app;
