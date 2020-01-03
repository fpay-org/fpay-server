const mongoose = require("mongoose");

const Fine = require("../models/fine");
const Driver = require("../models/driver");

const response = require("../utils/response");
const Logger = require("../utils/logger");
const logger = new Logger();

// Should paginate
exports.getAll = async (req, res) => {
  Fine.find()
    .exec()
    .then(fines => response(res, fines))
    .catch(err => response(res, null, 500));
};

exports.create = async (req, res) => {
  const fine = new Fine({
    _id: new mongoose.Types.ObjectId(),
    total_value: req.body.total_value,
    currency: req.body.currency,
    penalties: req.body.penalties,
    driver: req.body.driver,
    officer: req.body.officer,
    secondary_officer: req.body.secondary_officer,
    location: req.body.location,
    vehicle: req.body.vehicle,
    image_url: req.body.image_url,
    issued_at: Date.now()
  });

  logger.info("Was here");

  fine
    .save()
    .then(fine => {
      logger.info("Fine issued", fine);
      response(res);
    })
    .catch(err => response(res, null, 500, err));
};

exports.getByDriver = async (req, res) => {
  if (req && req.params && req.params.nid) {
    Driver.findOne({ nid: req.params.nid })
      .exec()
      .then(user => {
        if (!!user) {
          Fine.find({ driver: user._id })
            .exec()
            .then(docs => {
              response(res, docs);
            })
            .catch(err => response(res, null, 500, err));
        } else {
          logger.info("was here");
          response(res, null, 404, "Invalid driver id");
        }
      })
      .catch(err => response(res, null, 500, err));
  } else {
    response(res, null, 404, "No driver id found");
  }
};
