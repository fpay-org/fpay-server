const Penalty = require("../models/penalty");
const response = require("../utils/response");
const Logger = require("../utils/logger");
const mongoose = require("mongoose");
const logger = new Logger();

exports.getAll = async (req, res) => {
  Penalty.find()
    .exec()
    .then(penalty => response(res, penalty))
    .catch(err => response(res, null, 500, err));
};

exports.create = async (req, res) => {
  const penalty = new Penalty({
    _id: new mongoose.Types.ObjectId(),
    number: req.body.number,
    name: req.body.name,
    sinhalaName: req.body.sinhala_name,
    description: req.body.description,
    value: req.body.value
  });

  penalty
    .save()
    .then(penalty => response(res, null, 201))
    .catch(err => response(res, null, 500, err));
};
