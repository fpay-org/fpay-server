const mongoose = require("mongoose");

const dashSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: { type: String, required: true },
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  posted_at: {
    type: Date,
    default: Date.now,
    required: true
  },
  location: {
    name: { type: String, required: true },
    longitude: { type: String, required: true },
    latitude: { type: String, required: true }
  },
  image_url: {
    type: String
  },
  isVerified:{
    type:Boolean,
    default:false,    
  }
  
});

module.exports = mongoose.model("Dashboard", dashSchema);
