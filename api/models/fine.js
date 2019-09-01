const mongoose = require("mongoose");

const fineSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  number: Number
});

module.exports = mongoose.model("Fine", fineSchema);
