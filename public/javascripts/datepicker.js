/** Unavailable Dates **/
let unavailableDates = ["9-4-2019"];

function unavailable(date) {
  dmy = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
  if ($.inArray(dmy, unavailableDates) == -1) {
    return [true, ""];
  } else {
    return [false, "", "Unavailable"];
  }
}
/** FRONTEND */
$(function() {
  $("#datepicker").datepicker({
    dateFormat: "dd MM yy",
    beforeShowDay: unavailable,
    yearRange: '2019:2019',
    onSelect:() => {
      setMaxSeats() 
      countSeats_1Slot()
      countSeats_2Slot()
  },
    showAnim: "toggle"
  });
});


/** ADMIN */
$(function() {
  $("#datepicker-admin").datepicker({
    dateFormat: "dd MM yy",
    beforeShowDay: unavailable,
    yearRange: '2019:2019',
    onSelect:() => {
      countSeats_1Slot()
      countSeats_2Slot()
  },
    showAnim: "toggle"
  });
});
