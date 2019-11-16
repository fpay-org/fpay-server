const mongoose = require("mongoose");

const vehicleTypeSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  model: { type: String, required: true },
  name: { type: String, required: true },
  cost: { type: Number, required: true }
});

module.exports = mongoose.model("VehicleType", vehicleTypeSchema);
