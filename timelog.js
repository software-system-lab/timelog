const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
//route file declare
const Index = require('./server/index.js');
const Admin = require('./server/admin.js');
const Api = require('./server/Api.js');
const Login = require('./server/login.js');

//main framwork declare
var app = express();

//router variable declare
var UIRouter = express.Router();
// var adminRouter = express.Router();
var loginRouter = express.Router();

//body parser-for POST Info to transfer in http packet
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
//static route-front and end
app.use('/', express.static('UI'));
//app.use('/admin', express.static('adminUI'));

//router-sub directory separation
new Index(UIRouter);
app.use('/', UIRouter);

// new AdminUI(adminRouter);
// app.use('/admin', adminRouter);

new Login(app, loginRouter);
app.use('/login', loginRouter);

const hostname = '127.0.0.1';
const port = 5000;

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});