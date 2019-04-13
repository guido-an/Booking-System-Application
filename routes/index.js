const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking.js");
const nodemailer = require("nodemailer");

/* get HOME */
router.get("/", (req, res, next) => {
  res.render("index");
});

/* get COMPLETE BOOKING*/
router.get("/complete-booking", (req, res) => {
  let userBookingWhen = {
    // create an object with date, people and time properties
    date: req.query.date,
    people: req.query.people,
    time: req.query.time
  };
  res.render("complete-booking", userBookingWhen); // and pass the object to the page where the booking is finalized
});

/* post COMPLETE BOOKING */
router.post("/complete-booking", (req, res) => {
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
      res.redirect("/"); // redirect to home page
    })
    .catch(error => {
      console.log(error);
    });
});

// /* get list of BOOKINGS  */
// // router.get("/get-list-of-bookings", (req, res) => {
// //   Booking.find({ date: req.query.date }) // query the database based on the day selected ("datepicker input" index.hbs)

// //     .then(listOfBookingsByDate => {
// //       function checkBookingPerDate() {
// //         let sum = 0;
// //         listOfBookingsByDate.forEach(booking => {
// //           sum += booking.people; // total number of seats already reserved for this date
// //         });
// //         if (sum < 5) {
// //           console.log("you can book");

// //         } else {
// //           console.log("you can't boook");
// //         }
// //       }
// //       checkBookingPerDate(listOfBookingsByDate);

// //       res.redirect("complete-booking");
// //     })
// //     .catch(err => {
// //       console.log(err);
// //     });
// // });

/* get list of BOOKINGS  */
router.get("/get-list-of-bookings", (req, res) => {
  Booking.find({ date: req.query.date })
  .then(bookings => {
    res.send(bookings);
    console.log(bookings)
  });
});


/* get all the DATES  */
// router.get("/get-list-of-dates", (req, res) => {
//   Booking.find()
//   .then(dates => {
//     res.send(dates);
//   });
// });

module.exports = router;
