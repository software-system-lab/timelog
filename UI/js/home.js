var useR;
var ChoosenRecordID = null;
var usertaGs = new Map();
usertaGs.set(null, "none");

$(document).ready(function() {
  CheckLogin();
  setTimeout(function() {
    $('#Stop').hide();
    setToday();
    getRecentLog();
  }, 500);
  setTimeout(function() {
    renderData();
  }, 800);
});

function CheckLogin() {
  var apiUrl = '/login/IsLogined'
  var callback = function(loginStatus) {
    if (loginStatus != "false") {
      $("body").load('boardLogined.html');
      setTimeout(function() {
        useR = loginStatus.Name;
        $("#user").text(loginStatus.Name);
        $("#team").text(loginStatus.Team);
        GetTags();
      }, 300)
    } else {
      $("body").html("<img src='./assets/timelog.png' alt='logo' style='width:100px; display: block; margin: auto;'> \
      <h2> Not Logined </h2>  \
        <a href = './'> Click Here To Login </a>")
    }
  }
  Get(apiUrl, callback);
};

function GetTags() {
  var apiUrl = '/GetUserTags';
  var data = {
    "user": useR
  };
  var callback = function(results) {
    if (results != "failed") {
      for (var i = 0; i < results.length; i++) {
        $("#Tag").append("<option value='" + results[i].TagID + "'>" + results[i].Name + "</option>")
        $("#Tag_More").append("<option value='" + results[i].TagID + "'>" + results[i].Name + "</option>")
        usertaGs.set(results[i].TagID, results[i].Name);
      }
    }
  }
  Post(apiUrl, data, callback);
};

function setToday() {
  var Today = new Date();
  var month = (Today.getMonth() + 1).toString();
  var date = (Today.getDate()).toString();
  if (month.length == 1)
    month = "0" + month;
  if (date.length == 1)
    date = "0" + date;
  var Todaystr = (Today.getFullYear()).toString() + '-' + month + '-' + date;
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
  s = m = h = 0;
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
  if ($('#recordStart').val() == "" || $('#recordStop').val() == "" || $('#Event').val() == "")
    alert("Please check your log!");
  if ($('#recordStart').val() != "" && $('#recordStop').val() != "" && $('#Event').val() != "") {
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
      if (msg == "successed") {
        clearAll();
        getRecentLog();
      }
    }
    Post(url, data, callback);
  }
};

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

function getRecentLog() {
  var url = '/getRecentLog';
  var data = {
    "user": useR
  };
  var callback = function(results) {
    if (results != "failed") {
      var content = "";
      for (var i = 0; i < results.length; i++) {
        content +=
          "<tr> \
              <th scope='row'>" + results[i].Event + "</th> \
              <td>" + usertaGs.get(results[i].Tag) + "</td> \
              <td>" + results[i].Date + "</td> \
              <td>" + results[i].timeInterval + "</td> \
              <td ><span class='red'>\
                  <i class='fa fa-times' onclick='getLogDetail(event)' style='cursor:pointer;' data-toggle='modal' data-target='#ModalMore' data-recordID ='" + results[i].RecordID + "'>🖊️</i> \
                  </span> \
              </td> \
            </tr>";
        $("#recentLog").html(content);
        $('#fullpage').fullpage.reBuild();
      }
    }
  }
  Post(url, data, callback);
};

function getLogDetail(event) {
  var url = '/getLogDetail';
  ChoosenRecordID = event.target.dataset.recordid;
  var data = {
    RecordID: event.target.dataset.recordid
  };
  var callback = function(msg) {
    if (msg == "failed")
      alert("Please Retry");
    else {
      $("#ModalMore").modal('show');

      if (msg.Tag == null)
        msg.Tag = "NULL";
      $("#recordDate_More").val(msg.Date);
      $("#recordStart_More").val(msg.Start);
      $("#recordStop_More").val(msg.End);
      $("#timeInterval_More").val(msg.timeInterval);
      $("#Event_More").val(msg.Event);
      $("#Tag_More").val(msg.Tag);
      $("#Comment_More").val(msg.Comment);
    }
  }
  Post(url, data, callback);
};

function modifyALog() {
  if ($('#recordStart_More').val() == "")
    $('#recordStart_More').addClass("is-invalid");
  if ($('#recordStop_More').val() == "")
    $('#recordStop_More').addClass("is-invalid");
  if ($('#Event_More').val() == "")
    $('#Event_More').addClass("is-invalid");
  if ($('#recordStart_More').val() == "" || $('#recordStop_More').val() == "" || $('#Event_More').val() == "")
    alert("Please check your log!");
  if ($('#recordStart_More').val() != "" && $('#recordStop_More').val() != "" && $('#Event_More').val() != "") {
    var url = '/modifyALog';
    var data = {
      "RecordID": ChoosenRecordID,
      "recordDate": $('#recordDate_More').val(),
      "recordStart": $('#recordStart_More').val(),
      "recordStop": $('#recordStop_More').val(),
      "Event": $('#Event_More').val(),
      "Tag": $('#Tag_More').val(),
      "Comment": $('#Comment_More').val()
    };
    var callback = function(msg) {
      alert(msg);
      if (msg == "successed") {
        $('#ModalMore').modal('hide');
        getRecentLog();
      }
    }
    Post(url, data, callback);
  }
};

function deleteALog() {
  var url = '/deleteALog';
  var data = {
    "RecordID": ChoosenRecordID
  };
  var callback = function(msg) {
    alert(msg);
    if (msg == "successed") {
      $('#ModalMore').modal('hide');
      getRecentLog();
    }
  }
  Post(url, data, callback);
}

function renderData() {
  var ctx = $("#BarChart");
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });

  $('#fullpage').fullpage.reBuild();
}