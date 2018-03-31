var useR;
$(document).ready(function() {
  CheckLogin();
  setTimeout(function() {
    $('#Stop').hide();
    setToday();
  }, 300);
});

function CheckLogin() {
  var apiUrl = '/login/IsLogined'
  var callback = function(loginStatus) {
    if (loginStatus != "false") {
      $(".body").load('boardLogined.html');
      setTimeout(function() {
        useR = loginStatus.Name;
        $("#user").text(loginStatus.Name);
        $("#team").text(loginStatus.Team);
      }, 300)
    } else {
      $(".body").html("<img src='./assets/timelog.png' alt='logo' style='width:100px; display: block; margin: auto;'> \
      <h2> Not Logined </h2>  \
        <a href = './'> Click Here To Login </a>")
    }
  }
  Get(apiUrl, callback);
};

function setToday() {
  var Today = new Date();
  var month = (Today.getMonth() + 1).toString();
  if (month.length == 1)
    month = "0" + month;
  var Todaystr = (Today.getFullYear()).toString() + '-' + month + '-' + (Today.getDate()).toString();
  $("#recordDate").val(Todaystr);
}

var s = 0;
var m = 0;
var h = 0;
var t;

function setStart() {
  $('#Start').hide();
  $('#Stop').show();
  $('#recordStart').focus();
  $('.dtpicker-buttonSet').click();
  $('#Status').text("counting~");
  timedCount();
};

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
};

function setStop() {
  $('#Start').show();
  $('#Stop').hide();
  $('#recordStop').focus();
  $('.dtpicker-buttonSet').click();
  $('#Status').text("");
  clearTimeout(t);
};

function addALog() {
  if ($('#recordStart').val() == "")
    $('#recordStart').addClass("is-invalid");
  if ($('#recordStop').val() == "")
    $('#recordStop').addClass("is-invalid");
  if ($('#Event').val() == "")
    $('#Event').addClass("is-invalid");

  if ($('#recordStart').val() != "" || $('#recordStop').val() != "" || $('#Event').val() != "") {
    var url = '/addALog';
    var data = {
      "user": useR,
      "recordDate": $('#recordDate').val(),
      "recordStart": $('#recordStart').val(),
      "recordStop": $('#recordStop').val(),
      "Event": $('#Event').val(),
      "Tag": $('#Tag').val(),
      "Comment": $('#Comment').val()
    };
    var callback = function(msg) {
      alert(msg);
    }
    Post(url, data, callback);
  }
}

function clearAll() {
  setToday();
  $('#recordStart').val("");
  $('#recordStop').val("");
  $('#Event').val("");
  $('#Tag').val("NULL");
  $('#Comment').val("");
  $('#recordStart').removeClass("is-invalid");
  $('#recordStop').removeClass("is-invalid");
  $('#Event').removeClass("is-invalid");
};