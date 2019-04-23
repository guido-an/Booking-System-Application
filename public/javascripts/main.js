
let _1Slot
let _2Slot
let maxSeats


function setMaxSeats() {
  axios
    .get("/admin/config") 
    .then(config => {
      console.log(config)
    //  console.log(config.data[0].maxSeats)
     maxSeats = config.data[0].maxSeats
     console.log(maxSeats)
    
    })
    .catch(err => {
      console.log(err);
    });
}

function set_1Slot() {
  axios
    .get("/admin/config") 
    .then(config => {
      console.log(config.data[0]._1Slot)
    
     _1Slot = config.data[0]._1Slot
     $("#first-slot-li span").html(_1Slot);
    
    })
    .catch(err => {
      console.log(err);
    });
}


function set_2Slot() {
  axios
    .get("/admin/config") 
    .then(config => {
      console.log(config.data[0]._2Slot)
    
     _2Slot = config.data[0]._2Slot
     $("#second-slot-li span").html(_2Slot);
    
    })
    .catch(err => {
      console.log(err);
    });
}



// call this function on date selected (datepicker.js)
function countSeats_1Slot() {
  // pick the datepicker input value
  var date = $("#datepicker").val();
  axios
    .get("/get-list-of-bookings?date=" + date ) // and pass it to the axios route (the backend is querying for the date)
    .then(bookings => {
      let _1SeatsBooked = 0;
      $("#first-slot-li p").html(maxSeats + " seats left"); // if no bookings, start displaying max seats
      bookings.data.forEach(booking => {    // if there are bookings
        // 1 SLOT CHECK //
        console.log(bookings)
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



function countSeats_2Slot() {
  // pick the datepicker input value
  var date = $("#datepicker").val();
  axios
    .get("/get-list-of-bookings?date=" + date) // and pass it to the axios route (the backend is querying for the date)
    .then(bookings => {
      let _2SeatsBooked = 0;
      $("#second-slot-li p").html(maxSeats + " seats left"); // if no bookings, start displaying max seats
      bookings.data.forEach(booking => {    // if there are bookings
        // 2 SLOT CHECK //
        if (booking.time == _2Slot) {
          _2SeatsBooked += booking.people; // count seats booked
          let _2SeatsLeft = maxSeats - _2SeatsBooked; // and seats left

          if (_2SeatsLeft > 0) {
            $("#second-slot-li p").html(_2SeatsLeft + " seats left");
          } else {
            $("#second-slot-li p").html("Fully Booked "); // or fully booked
          }
        }
      });
    })
    .catch(err => {
      console.log(err);
    });
}




$("#first-slot-li").click(() => {
  $("#time-select span").html(_1Slot); // change span text 
  $("#time").attr("value", _1Slot); // change hidden input value (in order to be passed to the form)
});

$("#second-slot-li").click(() => {
  $("#time-select span").html(_2Slot); // change span text
  $("#time").attr("value", _2Slot); // change hidden input value (in order to be passed to the form)
});



function changeMaxPeopleInput() {
  var date = $("#datepicker").val();
  var time = $("#time").val();
  var seatsBooked = 0
  
  axios
    .get("/list-of-bookings-per-date-and-time?date=" + date + "&time=" + time) // query per date and time selected
    .then(bookings => {
      
     bookings.data.forEach(booking => {
       seatsBooked += booking.people
    })
    console.log(seatsBooked)
    var seatsLeft = maxSeats - seatsBooked
    
     $("#people").attr({
          max: seatsLeft, // use seats left for people input
          min: 0
        });
        $('#people').val("")   // reset people input to prevent bigger number to be displayed and booked  
        
    
    })
    .catch(err => {
      console.log(err);
    });
}




$('#people').click(() => {
  changeMaxPeopleInput()
})







