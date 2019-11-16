const mongoose = require("mongoose");

const Fine = require("./fine");

const officerSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  officerID: { type: String, required: true },
  password: { type: String, required: true },
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: false
  },
  role: {
    type: String,
    required: true
  },
  permission_level: {
    type: Number,
    required: true
  },
  fines_issued: {
    type: Fine[{}],
    required: true
  }
});

module.exports = mongoose.model("Officer", officerSchema);
