$( document ).ready(function() {
  set_1Slot()
  set_2Slot()
  setUnavailableDates()
  resetFormOnLoad()
  console.log( "ready to rock!" );

});

$( "#time-select" ).click(() => {
  $( "#time-select ul" ).toggleClass("display");
});


$('#test').click(() => {
  alert($(this).attr("href"))
})





