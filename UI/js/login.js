$(document).ready(function() {
  $("#loginBtn").click(function() {
    var data = {
      "ID": ($('#ID').val()),
      "Password": ($('#Password').val())
    }
    Post('/login', data, function(msg) {
      $(document).html(msg)
      //CheckLogin();
    });
  });
})