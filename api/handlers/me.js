const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const data = require("../config/data");

const response = require("../utils/response");
const Logger = require("../utils/logger");
const logger = new Logger();

/**
 * Return authorized user data
 * @param {string} token: token
 * @return {Json} 200: Success
 */

exports.get = async (req, res, next) => {
  const token = jwt.verify(req.query.token, data.JWT_SECRET);

  if (token.role == 0) {
    const Driver = require("../models/driver");

    Driver.findById(token.id)
      .exec()
      .then(driver => {
        if (!!driver) {
          driver.password = "fpay-encrypted";
          return response(res, driver);
        }
      })
      .catch(err => {
        logger.error(err);
        return response(res, null, 500, err);
      });
  } else {
    const Officer = require("../models/officer");

    Officer.findById(token.id)
      .exec()
      .then(officer => {
        if (!!officer) {
          officer.password = "fpay-encrypted";
          return response(res, officer);
        }
      })
      .catch(err => {
        logger.error(err);
        return response(res, null, 500, err);
      });
  }
};
