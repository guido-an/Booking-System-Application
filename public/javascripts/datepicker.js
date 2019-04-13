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
$(function() {
  $("#datepicker").datepicker({
    dateFormat: "dd MM yy",
    beforeShowDay: unavailable,
    yearRange: '2019:2019',
    onSelect: () => countSeatsPerDate(),
    showAnim: "toggle"
  });
});
