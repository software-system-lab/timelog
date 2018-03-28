$(document).ready(function() {
  CheckLogin();
  $("#loginBtn").click(function() {
    var data = {
      "ID": ($('#ID').val()),
      "Password": ($('#Password').val())
    }
    Post('/login', data, function(msg) {
      if (msg == 'successed!')
        location.href = "./home";
      else {
        alert(msg);
      }
      //CheckLogin();
    });
  });
});

function CheckLogin() {
  var apiUrl = '/login/IsLogined'
  var callback = function(loginStatus) {
    if (loginStatus != "false") {
      location.href = "./home";
    }
  }
  Get(apiUrl, callback);
};