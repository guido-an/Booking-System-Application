



// function countSeatsOnDateSelected(bookings) { // on the booking moment
//   let sum = 0;
//   bookings.data.forEach(booking => {
//     console.log(bookings);
//     sum += booking.people; // total number of seats already reserved for this date
//   });
//   if (sum < maximumSeatsPerDay) {
//     console.log("you can book");
//   } else {
//     console.log("you can't boook");
//   }
// }

// document.addEventListener(
//   "DOMContentLoaded",
//   () => {
//     /** On book form submission **/
//     document.getElementById("book-form").onsubmit = event => {    // when click on the form button 'index'

//       event.preventDefault(); // <= !!! prevent the page from reloading
//       var date = document.getElementById("datepicker").value; // pick the datepicker input value
//       axios
//         .get("/get-list-of-bookings?date=" + date) // and pass it to the axios route (the backend is querying for the date)
//         .then(bookings => {
//           countSeatsOnDateSelected(bookings); // execute the function
//         })
//         .catch(err => {
//           console.log(err);
//         });
//     };
//   },
//   false
// );

// var d = new Date();

// var month = d.getMonth()+1;
// var day = d.getDate();

// function checkDateAvailability(thisDate) {
//   const filteredDate = myBookings.filter(booking => booking.date == thisDate)
//   console.log(filteredDate)

//   var totalSeatsBooked = filteredDate.reduce(function (accumulator, booking) {
//   return accumulator + booking.people;
// }, 0);
// console.log(totalSeatsBooked)
// }

// checkDateAvailability("04/04/2019")
