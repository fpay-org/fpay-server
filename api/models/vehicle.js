const mongoose = require("mongoose");

const VehicleType = require("./vehicle-type");
const Driver = require("./driver");
const Fine = require("./fine");

const vehicleSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  type: { type: VehicleType, required: true },
  name: { type: String, required: false },
  current_owner: { type: Driver, required: true },
  previous_owners: { type: Driver[{}], required: true },
  fines: { type: Fine[{}], required: true },
  total_accidents: { type: Number, required: false }
});

module.exports = mongoose.model("Vehicle", vehicleSchema);
