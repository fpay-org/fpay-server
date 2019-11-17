const mongoose = require("mongoose");

const VehicleType = {
  id: mongoose.Schema.Types.ObjectId,
  model: String,
  name: String,
  cost: Number
};

module.exports = VehicleType;
