# Timelog

[![Build Status](https://drone.hsiang.me/api/badges/ois/timelog/status.svg)](https://drone.hsiang.me/ois/timelog)

![](static/image/timelog.png)

Timelog is a web app for users to record their time usage.
It have been developed by Vue.js and Node.js.

## Quick Start
1. Clone the project

2. Setup config files in `src/config.js` and server/config.js`.

3. In terminal,use node command to run timelog Server
```
$ npm install
$ npm run build
$ node server.js
```

4. Server starts.

If NODE_ENV is production
```
warning: please use IANA standard timezone format ('Etc/GMT-8')
Server running at http://0.0.0.0:80/
```
Else
```
warning: please use IANA standard timezone format ('Etc/GMT-8')
Server running at http://0.0.0.0:5000/
```

## Quick View

### login
![](/UI/assets/sampleLogin.png)
