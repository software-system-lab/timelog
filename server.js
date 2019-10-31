const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const history = require('connect-history-api-fallback');

//route file declare
const ProfileApis = require('./server/APIs/ProfileApiService.js')
const LogApis = require('./server/APIs/LogApiService.js')
const TeamApis = require('./server/APIs/team_api_service.js')
const PublishApis = require('./server/APIs/publish_api_service.js')

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
app.use('/api/Profile', ProfileRouter);

var LogRouter = express.Router();
new LogApis(LogRouter);
app.use('/api/Log', LogRouter);

var TeamRouter = express.Router();
new TeamApis(TeamRouter);
app.use('/api/team', TeamRouter);

var PublishRouter = express.Router();
new PublishApis(PublishRouter);
app.use('/api/publish', PublishRouter);



// Middleware for serving '/dist' directory
const staticFileMiddleware = express.static('dist');

// 1st call for unredirected requests
app.use(staticFileMiddleware);

// Support history api
app.use(history({
  index: '/dist/index.html'
}));

// 2nd call for redirected requests
app.use(staticFileMiddleware);

const hostname = '0.0.0.0';

var port
if (process.env.NODE_ENV === 'production') {
  port = 80;
} else {
  port = 5000;
}

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
