
/** Unavailable Dates **/
let unavailableDates

function unavailable(date) {
  dmy = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
  if ($.inArray(dmy, unavailableDates) == -1) {
    return [true, ""];
  } else {
    return [false, "", "Unavailable"];
  }
}
/****** FRONTEND ******/
$(function() {
  $("#datepicker").datepicker({
    dateFormat: "dd MM yy",
    beforeShowDay: unavailable,
    yearRange: '2019:2019',
    minDate: 0,  // start displaying dates from today
    onSelect:() => {
      setMaxSeats() 
      countSeats_1Slot()
      countSeats_2Slot()
      
  },
    showAnim: "toggle"
  });
});


/****** ADMIN ******/
$(function() {
  $(".datepicker-admin").datepicker({
    dateFormat: "dd MM yy",
    beforeShowDay: unavailable,
    yearRange: '2019:2019',
    minDate: 0,  // start displaying dates from today
    onSelect:() => {
      countSeats_1Slot()
      countSeats_2Slot()
  },
    showAnim: "toggle"
  });
});



function setUnavailableDates() {
  axios.get("/unavailable-dates")
  .then((config) => {
    unavailableDates = config.data
    $.each(unavailableDates, function (index, value) { // loop through the array 
      $( "#unavailable-dates-container" ).append( "<p>" + value + "</p>" + " "  ); // and display unavailable dates on page "admin/settings"
  });
  })
  .catch((err) => {
    console.log(err)
  })
} 

