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



/** Booking form styling HOME **/

$("#cta-hero") 
    .hover(() => { // trigger the mouseover event
        $("#booking-section form") 
            .css("transform", "scale(1.1)"); 
    }, () => { // trigger the mouseout event
        $("#booking-section form") 
            .css("transform", "scale(1"); 
    });





