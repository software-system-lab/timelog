$(document).ready(function() {
  CheckLogin();
});

function CheckLogin() {
  var apiUrl = '/login/IsLogined'
  var callback = function(loginStatus) {
    if (loginStatus != "false") {
      $(".body").load('boardLogined.html');
      setTimeout(function() {
        $("#user").text(loginStatus.Name);
        $("#team").text(loginStatus.Team);
      }, 500)
    } else {
      $(".body").html("<img src='./assets/timelog.png' alt='logo' style='width:100px; display: block; margin: auto;'> \
      <h2> Not Logined </h2>  \
        <a href = './'> Click Here To Login </a>")
    }
  }
  Get(apiUrl, callback);
};

var s = 0;
var m = 0;
var h = 0;
var t;

function setStart() {
  $('#recordStart').focus();
  $('.dtpicker-buttonSet').click();
  $('#Status').text("counting~");
  timedCount();
}


function timedCount() {
  s++;
  if (s == 60) {
    m++;
    s = 0;
  }
  if (m == 60) {
    h++;
    m = 0;
  }
  if (s.length == 1)
    s = "0" + s.toString();

  $('#Status').text("counting~ " + h + " : " + m + " : " + s);
  t = setTimeout("timedCount()", 1000);
}

function setStop() {
  $('#recordStop').focus();
  $('.dtpicker-buttonSet').click();
  $('#Status').text("");
  clearTimeout(t);
}