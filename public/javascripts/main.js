const _1Slot = "20.00";
const _2Slot = "22.00";
const maxSeats = 11;

// call this function on date selected (datepicker.js)
function countSeats_1Slot() {
  // pick the datepicker input value
  var date = $("#datepicker").val();
  axios
    .get("/get-list-of-bookings?date=" + date) // and pass it to the axios route (the backend is querying for the date)
    .then(bookings => {
      let _1SeatsBooked = 0;
      $("#first-slot-li p").html(maxSeats + " seats left"); // if no bookings, start displaying max seats
      bookings.data.forEach(booking => {    // if there are bookings
        // 1 SLOT CHECK //
        if (booking.time == _1Slot) {
          _1SeatsBooked += booking.people; // count seats booked
          let _1SeatsLeft = maxSeats - _1SeatsBooked; // and seats left

          if (_1SeatsLeft > 0) {
            $("#first-slot-li p").html(_1SeatsLeft + " seats left");
          } else {
            $("#first-slot-li p").html("Fully Booked "); // or fully booked
          }
        }
      });
    })
    .catch(err => {
      console.log(err);
    });
}

$("#first-slot-li").click(() => {
  maxPeopleInput = parseInt($("#first-slot-li p").html()); // take the seats left number

  $("#people").attr({
    max: maxPeopleInput, // and use it as max number for people input
    min: 1
  });

  $("#time-select span").html(_1Slot); // change span text 
  $("#time").attr("value", _1Slot); // change hidden input value (in order to be passed to the form)
});

$("#second-slot-li").click(() => {
  $("#time-select span").html(_2Slot); // change span text
  $("#time").attr("value", _2Slot); // change hidden input value (in order to be passed to the form)
});



function checkMaxPeopleInput() {
  var date = $("#datepicker").val();
  var time = $("#time").val();

  var seatsBooked = 0
 axios
    .get("/list-of-bookings-before-proceeding?date=" + date + "&time=" + time) // query per date and time selected
    .then(bookings => {
     bookings.data.forEach(booking => {
       seatsBooked += booking.people
    })
    console.log(seatsBooked)
    return seatsBooked 
    })

    .catch(err => {
      console.log(err);
    });

    
}




$('#people').click(() => {
 
  checkMaxPeopleInput()
  
})




