const mongoose = require("mongoose");

const driverSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  nid: { type: String, required: true },
  password: { type: String, required: true },
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String
  },
  fines: {
    type: Array,
    required: true
  },
  vehicles: {
    type: Array,
    required: true
  },
  contact_number: {
    type: String,
    required: true
  },
  avatar_url: {
    type: String
  },
  license_number: { type: String, required: true }
});

module.exports = mongoose.model("Driver", driverSchema);
