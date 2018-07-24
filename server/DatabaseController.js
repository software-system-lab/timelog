'use strict';

const mysql = require('mysql');

// 與資料庫連線
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '1234',
  database: 'timelog'
});

function handleDisconnect() {
  // 資料庫連線發生錯誤處理
  connection.connect(function(err) {
    if (err) {
      console.log('error when connecting to db:', err);
      // 2秒後重新連線
      setTimeout(handleDisconnect, 2000);
    }
  });

  // 連線發生錯誤處理
  connection.on('error', function(err) {
    console.log('db error', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      // 連線失效處理
      handleDisconnect();
    } else {
      throw err;
    }
  });
};

// 連線
handleDisconnect();

exports.GetDB = function() {
  return connection;
}

exports.ExecuteSQLCommand = function(command) {
  connection.query(command, function(err, result) {
    if (err)
      console.log(err);
    else
      console.log(result);
  });
}

exports.ExecuteSQLCommandWithoutLog = function(command) {
  connection.query(command, function(err, result) {
    //若要獲取資料請直接getDB後query
  });
}

exports.callback = function(err, result) {
  if (err)
    console.log(err);
  else
    console.log(result);
}