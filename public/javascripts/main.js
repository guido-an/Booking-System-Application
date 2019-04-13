

 function countSeatsPerDate() { // call this function on date selected (datepicker.js)
  var date = document.getElementById("datepicker").value; // pick the datepicker input value
  axios
    .get("/get-list-of-bookings?date=" + date) // and pass it to the axios route (the backend is querying for the date)
    .then(bookings => {
      console.log(bookings.data); // execute the function
    })
    .catch(err => {
      console.log(err);
    });
}