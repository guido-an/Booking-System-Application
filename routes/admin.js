const express = require("express");
const router = express.Router();

const Booking = require("../models/Booking");
const Config = require("../models/Config");



/** FILTER bookings */
router.get('/filter-bookings', (req, res) => {
  Booking.find({ date: req.query.date, time: req.query.time })
  .then((filteredBookings) => {
    res.render('auth/private', {filteredBookings:filteredBookings})
    console.log(filteredBookings)
  })
})

/* DELETE bookings */
router.post('/:id/delete', (req, res) => {
  Booking.findByIdAndRemove(req.params.id)
    .then(() => {
      res.redirect('/auth/private')
      console.log()
    })
    .catch((error) => {
      console.log(error);
    })
});

/* SETTING page */
router.get('/settings', (req, res) => {
  res.render('admin/settings')
})


router.post('/config', (req, res) => {
  
})


module.exports = router;