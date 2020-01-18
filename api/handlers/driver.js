const mongoose = require("mongoose");
const Driver = require("../models/driver");

const response = require("../utils/response");
const Logger = require("../utils/logger");
const logger = new Logger();

exports.update = async (req, res) => {
  if (req && req.params && req.params.nid) {
    logger.info("Update request for", req.params.nid);

    Driver.findOne({ nid: req.params.nid })
      .exec()
      .then(user => {
        if (!!user) {
          const newUser = {
            
          }

          Driver.updateOne({ nid: req.params.nid })
            .exec()
            .then(res => logger.info(res))
            .catch(err => logger.error(err));
        } else {
          response(res, null, 404, "Invalid driver id");
        }
      })
      .catch(err => response(res, null, 500, err));
  } else {
    response(res, null, 404, "No driver id found");
  }
};
