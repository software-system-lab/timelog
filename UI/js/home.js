$(document).ready(function() {
  CheckLogin();

});

function CheckLogin() {
  var apiUrl = '/login/IsLogined'
  var callback = function(loginStatus) {
    if (loginStatus != "false") {
      $("#fullpage").load('board.html');
    }
  }
  Get(apiUrl, callback);
};