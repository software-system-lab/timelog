$(document).ready(function() {
  CheckLogin();
  // $('#Datepicker').datepicker({
  //   calendarWeeks: true,
  //   todayHighlight: true,
  //   datesDisabled: ['03/06/2018', '03/21/2018']
  // });

  // $("#dtBox").DateTimePicker({
  //   // "date", "time", or "datetime"
  //
  //   mode: "date",
  //   defaultDate: new Date(),
  //   dateSeparator: "-",
  //   timeSeparator: ":",
  //   timeMeridiemSeparator: " ",
  //   dateTimeSeparator: " ",
  //
  //   dateTimeFormat: "dd-MM-yyyy HH:mm:ss",
  //   dateFormat: "dd-MM-yyyy",
  //   timeFormat: "HH:mm",
  //
  //   maxDate: null,
  //   minDate: null,
  //
  //   maxTime: null,
  //   minTime: null,
  //
  //   maxDateTime: null,
  //   minDateTime: null,
  //
  //   shortDayNames: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  //   fullDayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  //   shortMonthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  //   fullMonthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  //   formatHumanDate: function(sDate) {
  //     return sDate.dayShort + ", " + sDate.month + " " + sDate.dd + ", " + sDate.yyyy;
  //   },
  //
  //   minuteInterval: 1,
  //   roundOffMinutes: true,
  //
  //   titleContentDate: "Set Date",
  //   titleContentTime: "Set Time",
  //   titleContentDateTime: "Set Date & Time",
  //
  //   buttonsToDisplay: ["HeaderCloseButton", "SetButton", "ClearButton"],
  //   setButtonContent: "Set",
  //   clearButtonContent: "Clear",
  //   setValueInTextboxOnEveryClick: false,
  //
  //   animationDuration: 400,
  //
  //   isPopup: true,
  //
  //   parentElement: null,
  //
  //   addEventHandlers: null, // addEventHandlers(oDateTimePicker)
  //   beforeShow: null, // beforeShow(oInputElement)
  //   afterShow: null, // afterShow(oInputElement)
  //   beforeHide: null, // beforeHide(oInputElement)
  //   afterHide: null, // afterHide(oInputElement)
  //   buttonClicked: null // buttonClicked(sButtonType, oInputElement) where sButtonType = "SET"|"CLEAR"|"CANCEL"
  //
  //
  // });

});

function CheckLogin() {
  var apiUrl = '/login/IsLogined'
  var callback = function(loginStatus) {
    if (loginStatus != "false") {
      $(".body").load('boardLogined.html');
    }
  }
  Get(apiUrl, callback);
};