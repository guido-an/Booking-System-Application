$( document ).ready(function() {
  set_1Slot()
  set_2Slot()
  console.log( "ready to rock!" );
});

$( "#time-select" ).click(() => {
  $( "#time-select ul" ).toggleClass("display");
});







