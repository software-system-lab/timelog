const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');

//route file declare
const ProfileApis = require('./APIs/ProfileApiService.js')
const LogApis = require('./APIs/LogApiService.js')

//main framwork declare
var app = express();

//body parser-for POST Info to transfer in http packet
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

//router-sub directory separation
var ProfileRouter = express.Router();
new ProfileApis(ProfileRouter);
app.use('/Profile', ProfileRouter);

var LogRouter = express.Router();
new LogApis(LogRouter);
app.use('/Log', LogRouter);

const hostname = '0.0.0.0';
const port = 5000;

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
