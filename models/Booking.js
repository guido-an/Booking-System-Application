const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const bookingSchema = new Schema({
    date: String,
    people: Number,
    time: String,
    firstName: String,
    lastName: String,
    phone: String,
    email: String,
    message: String
  },
  { timestamps: { 
    createdAt: 'created_at',
 }
});


const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;