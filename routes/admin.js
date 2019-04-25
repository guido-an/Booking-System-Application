const express = require("express");
const router = express.Router();

const Booking = require("../models/Booking");
const Config = require("../models/Config");


/***************** ADMIN PAGE ******************/
/** 1) FILTER DATE bookings */
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


/* 2) FILTER NAME bookings */
router.get('/filter-bookings/name', (req, res) => {
  Booking.find({ $or: [ { firstName: req.query.firstName}, { lastName: req.query.firstName } ] } )
  .then((filteredBookingsPerName) => {
    res.render('auth/private', {filteredBookingsPerName: filteredBookingsPerName})
  })
  .catch((err) => {
    console.log(err)
  })
})




/* 2) DELETE bookings */
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

/* 3) ADD bookings */
router.post('/add-booking', (req, res) => {
  Booking.create(req.body)
  .then(() => {
    res.redirect('/auth/private')
  })
  .catch((err) => {
    console.log(err)
  })
  
})

/* 4) EDIT bookings */
router.post('/:id/edit', (req, res) => {
  Booking.update( {_id: req.params.id }, req.body)
  .then(() => {
    res.redirect('/auth/private')
  })
  .catch(() => {
    console.log(err)
  })
})

/* 5) GET CONFIG settings */   // used with axios for setMaxSeats() in main.js 
router.get('/config', (req, res) => {
  Config.find()
  .then((config) => {
     res.send(config)
     console.log(config)
  })
  .catch((err) => {
    console.log(err)
  })
})

/* 6) post UPDATE CONFIG settings */ 
router.post('/config', (req, res) => {
  Config.updateOne(req.body) // update config document 
  .then((config) => {
    res.redirect('/admin/settings')
  })
  .catch((err) => {
    console.log(err)
  })
})


/***************** SETTINGS PAGE ******************/
/* 1) get setting page */
router.get('/settings', (req, res) => {
  Config.find()
  .then((config) => {   
     res.render('admin/settings', { config: config})
  })
  .catch((err) => {
    console.log(err)
  })
})


/** 2) GET Unavailable Dates*/
router.get('/settings/unavailable-dates', (req, res) => {
  Config.find({}, {unavailableDates: 1}) // filter only unavailable dates'projection'
  .then((config) => {
     res.send(config[0].unavailableDates)  // send only unavailable dates and use Axios
  })
  .catch((err) => {
    console.log(err)
  })
})


/*** 3) ADD Unavailable Date */
router.post('/settings/unavailable-dates/edit', (req, res) => {
  let newUnavailableDate = req.body.newUnavailableDate
  Config.updateOne({ _id:"5cc08f8deb2af01add7693d9" }, { $push: { unavailableDates: newUnavailableDate } }, { new: true })
  .then(() => {
      res.redirect('/admin/settings')
  })
  .catch((err) => {
    console.log(err)
  })
})


/*** 4) DELETE Unavailable Date */
router.post('/settings/unavailable-dates/delete', (req, res) => {
  let deleteUnavailableDate = req.body.deleteUnavailableDate
  Config.updateOne({ _id:"5cc08f8deb2af01add7693d9" }, { $pull: { unavailableDates: deleteUnavailableDate } }, { new: true })
  .then(() => {
    res.redirect('/admin/settings')
})
.catch((err) => {
  console.log(err)
})
})



module.exports = router;