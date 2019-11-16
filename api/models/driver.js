const mongoose = require("mongoose");

const Fine = require("./fine");
const Vehicle = require("./vehicle");

const driverSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username: { type: String, required: true },

  password: { type: String, required: true },
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: false
  },
  fines: {
    type: Fine[{}],
    required: true
  },
  vehicles: {
    type: Vehicle[{}],
    required: true
  },
  email: {
    type: String,
    required: true,
    match: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
  },
  contact_number: {
    type: number,
    required: true
  }
});

module.exports = mongoose.model("Driver", driverSchema);
