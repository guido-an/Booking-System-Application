const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking.js");
const Config = require("../models/Config");
const nodemailer = require("nodemailer");


var flash = require('connect-flash');


/* get HOME */
router.get("/", (req, res, next) => {
  res.render("index");
});

/* get list of BOOKINGS per DATE API */
router.get("/get-list-of-bookings", (req, res) => {
  Booking.find({ date: req.query.date }, { date: 1, time: 1, people: 1 } )
  .then(bookings => {
    res.send(bookings);
    console.log(bookings)
  });
});

 /* get list of BOOKINGS per DATE and TIME  API */
router.get("/list-of-bookings-per-date-and-time", (req, res) => {
  Booking.find({ date: req.query.date, time: req.query.time }, { date: 1, time: 1, people: 1 })
  .then(bookings => {
    res.send(bookings);
  });
});


/* get COMPLETE BOOKING*/
// router.get("/complete-booking", (req, res) => {
//   let userBookingWhen = {
//     // create an object with date, people and time properties
//     date: req.query.date,
//     people: req.query.people,
//     time: req.query.time
//   };
//   res.render("complete-booking", userBookingWhen); // and pass the object to the page where the booking is finalized
// });
router.get("/complete-booking", (req, res) => {
  if(req.query.date != "" && req.query.time != "" && req.query.people != "") {
    let userBookingWhen = {
      date: req.query.date,
      people: req.query.people,
      time: req.query.time
    };
    res.render("complete-booking", userBookingWhen); // and pass the object to complete-booking page
  } else {
    let error = {}
    res.render('index', {error: error})
  }
});

/* post COMPLETE BOOKING */
router.post("/thankyou", (req, res) => {
  Booking.create(req.body); // create new booking
  let {
    date,
    people,
    time,
    firstName,
    lastName,
    phone,
    email,
    message
  } = req.body;

  let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "carucciguido@gmail.com",
      pass: "Josejose2"
    }
  });
  transporter.sendMail({
    // email to the ADMIN
    from: "Book Your Table",
    to: `carucciguido@gmail.com`,
    subject: `New Booking From ${firstName} ${lastName}`,
    text: message,
    html: `<h2>New Booking: </h2><br><br><h3>Date: ${date}<br>People: ${people}<br>Time: ${time}<br>First name: ${firstName}<br>Last name: ${lastName}<br>Phone: ${phone}<br>Email: ${email}<br>Message: ${message}</h3>`
  });
  transporter
    .sendMail({
      // email to the CUSTOMER
      from: "Book Your Table",
      to: `${email}`,
      subject: `Booking Confirmed`,
      text: message,
      html: `<h2>Booking Confirmed: </h2><br><br><h3>Date: ${date}<br>People: ${people}<br>Time: ${time}<br>First name: ${firstName}<br>Last name: ${lastName}<br>Phone: ${phone}<br>Email: ${email}<br>Message: ${message}</h3>`
    })

    .then(() => {
     
      let succesfullMessage = {}
      let { date, people, time, firstName, lastName, phone, email, message } = req.body;

        res.render('thankyou', {
          succesfullMessage: succesfullMessage,
          date: date,
          people: people,
          time: time,
          firstName: firstName,
          lastName: lastName,
          phone: phone,
          email: email,
          message: message
        } );            
    })
    .catch(error => {
      console.log(error);
    });
});


module.exports = router;
