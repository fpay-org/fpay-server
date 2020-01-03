const mongoose = require("mongoose");

const vehicleSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  license_number: { type: String, required: true },
  type: { type: mongoose.Types.ObjectId, ref: "VehicleType", required: true },
  current_owner: {
    type: mongoose.Types.ObjectId,
    ref: "Driver",
    required: true
  },
  previous_owners: { type: Array, required: false },
  fines: { type: Array, required: true }
});

module.exports = mongoose.model("Vehicle", vehicleSchema);
