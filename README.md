# Timelog

[![Build Status](https://drone.hsiang.me/api/badges/ois/timelog/status.svg)](https://drone.hsiang.me/ois/timelog)

![](static/image/timelog.png)

Timelog is a web app for users to record how they use time.
It have been developed by node.js and mySQL.

## How to use
### Sever
1. Clone the project

2. In terminal,cd to the root folder of this project

```
$ cd /path/to/timelog
```

3. Setup config files in `src/config.js` and server/config.js`.

4. In terminal,use node command to run timelog Server
```
$ npm install
$ npm run build
$ node server.js
```

5. Server will starts.

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

## Website

### login
![](/UI/assets/sampleLogin.png)
