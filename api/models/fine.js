const mongoose = require("mongoose");

const fineSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  value: { type: Number, required: true },
  penalties: { type: Array, required: true },
  driver: { type: Number, required: true },
  officer: { type: Number, required: true },
  secondary_officer: { type: Number, required: true },
  location: { type: Array, required: true },
  vehicle: { type: String, required: true }
});

module.exports = mongoose.model("Fine", fineSchema);
