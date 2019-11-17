const mongoose = require("mongoose");

const VehicleType = require("../interfaces/vehicle-type");

const vehicleSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  type: { type: VehicleType, required: true },
  name: { type: String, required: false },
  current_owner: { type: String, required: true },
  previous_owners: { type: Array, required: true },
  fines: { type: Array, required: true },
  total_accidents: { type: Number, required: false }
});

module.exports = mongoose.model("Vehicle", vehicleSchema);
