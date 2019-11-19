const mongoose = require("mongoose");

const vehicleSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  type: { type: String, required: true },
  name: { type: String, required: false },
  reg_number: { type: Number, required: false },
  current_owner: { type: String, required: true },
  previous_owners: { type: Array, required: true },
  fines: { type: Array, required: true }
});

module.exports = mongoose.model("Vehicle", vehicleSchema);
