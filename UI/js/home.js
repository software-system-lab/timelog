$(document).ready(function() {
  CheckLogin();
  $('#Datepicker').datepicker({
    calendarWeeks: true,
    todayHighlight: true,
    datesDisabled: ['03/06/2018', '03/21/2018']
  });
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