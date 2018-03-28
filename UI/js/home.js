$(document).ready(function() {
  CheckLogin();
  $("#Start").click(function() {
    $('#recordStart').click();
  });
  $("#Stop").click(function() {

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

function setStart() {
  $('#recordStart').focus();
  $('.dtpicker-buttonSet').click();
  $('#status').text("counting~");
}

function setStop() {
  $('#recordStop').focus();
  $('.dtpicker-buttonSet').click();
  $('#status').text("");
}