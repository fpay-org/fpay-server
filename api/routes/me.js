const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const data = require("../config/data");

const response = require("../utils/response");
const Logger = require("../utils/logger");
const logger = new Logger();

router.get("/:token", (req, res, next) => {
  const token = jwt.verify(req.params.token, data.JWT_SECRET);

  if (token.role == 0) {
    // Handle driver
    const Driver = require("../models/driver");

    Driver.findById(token.id)
      .exec()
      .then(driver => {
        return response(res, 200, "Success", driver);
      })
      .catch(err => {
        logger.error(err);
        return response(res, 500, err);
      });
  } else {
    const Officer = require("../models/officer");

    Officer.findById(token.id)
      .exec()
      .then(officer => {
        return response(res, 200, "Success", officer);
      })
      .catch(err => {
        logger.error(err);
        return response(res, 500, err);
      });
  }
});

module.exports = router;
