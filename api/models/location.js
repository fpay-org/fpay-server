const mongoose = require("mongoose");

const Fine = require("./fine");

const locationSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  longitude: { type: String, required: true },
  latitude: { type: String, required: true },
  fines: { type: Fine[{}], required: true },
  total_fines: { type: Number, required: false },
  total_accidents: { type: Number, required: false }
});

module.exports = mongoose.model("Location", locationSchema);
