const mongoose = require("mongoose");

const Penalty = require("./penalty");
const Driver = require("./driver");
const Officer = require("./officer");
const Location = require("./location");
const Vehicle = require("./vehicle");

const fineSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  value: { type: Number, required: true },
  penalties: { type: Penalty, required: true }
});

module.exports = mongoose.model("Fine", fineSchema);
