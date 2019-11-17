const mongoose = require("mongoose");

const Driver = require("./driver");
const Officer = require("./officer");
const Location = require("./location");
const Vehicle = require("./vehicle");

const fineSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  value: { type: Number, required: true },
  penalties: { type: Array, required: true },
  driver: { type: String, required: true },
  officer: { type: String, required: true },
  secondary_officer: { type: String, required: true }
  // location: { type: Location, required: true },
  // vehicle: { type: Vehicle, required: true }
});

module.exports = mongoose.model("Fine", fineSchema);
