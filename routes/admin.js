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

/* GET config */   // used with axios for frontend form 
router.get('/config', (req, res) => {
  Config.find()
  .then((config) => {
     res.send(config)
  })
  .catch((err) => {
    console.log(err)
  })
})


/* POST CONFIG settings */ 
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









// router.get('/config', (req, res) => {
//   Config.find()
//   .then((config) => {
//     console.log(config)
//     res.render('admin/settings', { config: config } )
    
//   })
//   .catch((err) => {
//     console.log(err)
//   })
// })


// router.post('/config', (req, res) => {
//   Config.create(req.body)
  
//   .then(() => {
//     let {
//       maxSeats,
//       _1Slot,
//       _2Slot
//     } = req.body
//     res.redirect('/admin/settings')
//   })
// })


module.exports = router;