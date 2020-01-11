const mongoose = require("mongoose");

const fineSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  total_value: { type: Number, required: true },
  currency: { type: String, required: true, default: "lkr" },
  penalties: { type: Array, required: true },
  driver: { type: mongoose.Types.ObjectId, ref: "Driver", required: true },
  officer: { type: mongoose.Types.ObjectId, ref: "Officer", required: true },
  secondary_officer: {
    type: mongoose.Types.ObjectId,
    ref: "Officer",
    required: true
  },
  location: {
    _id: { type: mongoose.Types.ObjectId, ref: "Location", required: true },
    longitude: { type: String, required: true },
    latitude: { type: String, required: true }
  },
  vehicle: { type: mongoose.Types.ObjectId, ref: "Vehicle", required: true },
  image_url: {
    type: String
  },
  issued_at: {
    type: Date,
    default: Date.now,
    required: true
  },
  is_paid: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("Fine", fineSchema);
