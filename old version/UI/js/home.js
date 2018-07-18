var useR;
var ChoosenRecordID = null;
var usertaGs = new Map();
usertaGs.set(null, {
  "name": "none",
});

$(document).ready(function() {
  CheckLogin();
  setTimeout(function() {
    $('#Stop').hide();
    setDefaltDay();
    getRecentLog();
  }, 500);
  setTimeout(function() {
    renderStatisticsData();
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
        usertaGs.set(results[i].TagID, {
          "name": results[i].Name
        });
      }
    }
  }
  Post(apiUrl, data, callback);
};

function setDefaltDay() {
  var Today = new Date();
  var month = (Today.getMonth() + 1).toString();
  var date = (Today.getDate()).toString();
  var dateBeforeAWeek = (Today.getDate() - 7).toString();
  if (month.length == 1)
    month = "0" + month;
  if (date.length == 1)
    date = "0" + date;
  if (dateBeforeAWeek.length == 1)
    dateBeforeAWeek = "0" + dateBeforeAWeek;
  var Todaystr = (Today.getFullYear()).toString() + '-' + month + '-' + date;
  var dayBeforeAWeekstr = (Today.getFullYear()).toString() + '-' + month + '-' + dateBeforeAWeek;

  $("#recordDate").val(Todaystr);
  $("#Duration_end").val(Todaystr);
  $("#Duration_start").val(dayBeforeAWeekstr);
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
  setDefaltDay();
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
              <td>" + usertaGs.get(results[i].Tag).name + "</td> \
              <td>" + results[i].Date + "</td> \
              <td>" + results[i].timeInterval + "</td> \
              <td ><span class='red'>\
                  <i class='fa fa-times' onclick='getLogDetail(event)' style='cursor:pointer;' data-toggle='modal' data-target='#ModalMore' data-recordID ='" + results[i].RecordID + "'>🖊️</i> \
                  </span> \
              </td> \
            </tr>";
      }
      $("#recentLog").html(content);
      $('#fullpage').fullpage.reBuild();
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

function renderStatisticsData() {
  var url = '/getStatistics';
  var data = {
    "user": useR,
    "start": $("#Duration_start").val(),
    "end": $("#Duration_end").val()
  };
  var callback = function(results) {
    if (results != "failed") {
      var resultToPieChart = computePieChartData(results);
      console.log(results);

      var content = "";
      for (var i = 0; i < results.length; i++) {
        content +=
          "<tr> \
              <th scope='row'>" + results[i].Event + "</th> \
              <td>" + usertaGs.get(results[i].Tag).name + "</td> \
              <td>" + results[i].Date + "</td> \
              <td>" + results[i].timeInterval + "</td> \
              <td ><span class='red'>\
                  <i class='fa fa-times' onclick='getLogDetail(event)' style='cursor:pointer;' data-toggle='modal' data-target='#ModalMore' data-recordID ='" + results[i].RecordID + "'>🖊️</i> \
                  </span> \
              </td> \
            </tr>";
      }
      $("#durationLog").html(content);

      var config = {
        type: 'doughnut',
        data: {
          datasets: [{
            data: [],
            backgroundColor: [
              'rgba(255, 99, 132, 0.8)',
              'rgba(54, 162, 235, 0.8)',
              'rgba(255, 206, 86, 0.8)',
              'rgba(75, 192, 192, 0.8)',
              'rgba(153, 102, 255, 0.8)',
              'rgba(255, 159, 64, 0.8)',
              'rgba(121, 180, 169, 0.8)'
            ],
            label: ''
          }],
          labels: []
        },
        options: {
          responsive: true,
          animation: {
            duration: 2000
          }
        }
      };

      var ctx = $("#PieChart");
      var PieChart = new Chart(ctx, config);

      var content = "";
      var total = 0;

      resultToPieChart.forEach((val) => {
        if (val.h + val.m / 60) {
          PieChart.data.labels.push(val.name);
          PieChart.data.datasets[0].data.push((val.h + val.m / 60).toFixed(2));
        }

        total += (val.h + val.m / 60);
      });
      resultToPieChart.forEach((val) => {
        content += "<tr> \
            <th scope='row'>" + val.name + "</th> \
            <td>" + (val.h + val.m / 60).toFixed(2) + "</td> \
            <td>" + ((val.h + val.m / 60) / total * 100).toFixed(2) + " % </td> \
          </tr>";
      });

      PieChart.update();
      $("#summary").html(content);

      $('#fullpage').fullpage.reBuild();
    }
  }
  Post(url, data, callback);
}

function computePieChartData(data) {
  var tagGroup = usertaGs;
  tagGroup.forEach((val) => {
    val.h = 0;
    val.m = 0;
  })
  for (var i = 0; i < data.length; i++) {
    var IntervalStr = data[i].timeInterval.split(":")
    tagGroup.get(data[i].Tag).h += parseInt(IntervalStr[0]);
    tagGroup.get(data[i].Tag).m += parseInt(IntervalStr[1]);
  }
  return tagGroup;
}