const express = require("express");
const router = express.Router();

const Booking = require("../models/Booking");
const Config = require("../models/Config");



/** FILTER bookings */
router.get('/filter-bookings', (req, res) => {
  Booking.find({ date: req.query.date, time: req.query.time })
  .then((filteredBookings) => {
    res.render('auth/private', {
      filteredBookings:filteredBookings,
      date: req.query.date,
      time: req.query.time
    })
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

/* get CONFIG settings */   // used with axios for frontend form 
router.get('/config', (req, res) => {
  Config.find()
  .then((config) => {
     res.send(config)
  })
  .catch((err) => {
    console.log(err)
  })
})

/* post UPDATE CONFIG settings */ 
router.post('/config', (req, res) => {
  Config.updateOne(req.body) // update config document 
  .then((config) => {
    res.redirect('/admin/settings')
  })
  .catch((err) => {
    console.log(err)
  })
})

/* SETTING page */
router.get('/settings', (req, res) => {
  Config.find()
  .then((config) => {
     console.log(config)
     res.render('admin/settings', { config: config } )
  })
  .catch((err) => {
    console.log(err)
  })
})


/** get UNAVAILBALE DATES*/
router.get('/settings/unavailable-dates', (req, res) => {
  Config.find({}, {unavailableDates: 1}) // filter only unavailable dates'projection'
  .then((config) => {
     res.send(config[0].unavailableDates)  // send only unavailable dates and use Axios
  })
  .catch((err) => {
    console.log(err)
  })
})


router.post('/settings/update-unavailable-dates', (req, res) => {
  // Config.updateOne()
})


module.exports = router;