const mongoose = require("mongoose");

const Fine = require("../models/fine");
const Driver = require("../models/driver");
const Vehicle = require("../models/vehicle");
const Officer = require("../models/officer");
const Location = require("../models/location");

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
  const officer_id = await Officer.findOne({ officer_id: req.body.officer })
    .exec()
    .then(officer => officer._id)
    .catch(err => response(res, null, 500, err));

  const secondary_officer_id = await Officer.findOne({
    officer_id: req.body.secondary_officer
  })
    .exec()
    .then(officer => officer._id)
    .catch(err => response(res, null, 500, err));

  const driver_id = await Driver.findOne({ nid: req.beody.driver_nid })
    .exec()
    .then(driver => driver._id)
    .catch(err => response(res, null, 500, err));

  // Schedule location

  // Schedule vehicles

  const penalties = req.body.penalties.map(penalty => penalty.toString());

  const fine = new Fine({
    _id: new mongoose.Types.ObjectId(),
    total_value: req.body.total_value,
    currency: req.body.currency,
    penalties: penalties,
    driver: driver_id,
    officer: officer_id,
    secondary_officer: secondary_officer_id,
    location: req.body.location,
    vehicle: req.body.vehicle_license_number,
    image_url: req.body.officer_avatar_url,
    issued_at: Date.now()
  });

  fine
    .save()
    .then(fine => {
      logger.info("Fine issued", fine);
      response(res, null, 201);
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
