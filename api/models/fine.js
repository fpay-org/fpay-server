const mongoose = require("mongoose");

const fineSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  total_value: { type: Number, required: true },
  currency: { type: String, required: true, default: "lkr" },
  penalties: { type: Array, required: false },
  driver: { type: mongoose.Types.ObjectId, ref: "Driver", required: true },
  officer: { type: mongoose.Types.ObjectId, ref: "Officer", required: true },
  secondary_officer: {
    type: mongoose.Types.ObjectId,
    ref: "Officer",
    required: true
  },
  location: {
    name: { type: String, required: false },
    longitude: { type: String, required: false },
    latitude: { type: String, required: false }
  },
  vehicle: { type: String, required: true },
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
