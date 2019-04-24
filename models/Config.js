const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const configSchema = new Schema({
  maxSeats: String,
  _1Slot: String,
  _2Slot: String,
  unavailableDates: Array
},{
  timestamps: true
})

const Config = mongoose.model("Config", configSchema);

module.exports = Config;