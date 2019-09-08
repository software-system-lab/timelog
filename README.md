# timelog

> timelog is a web app for users to record how they use time.

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


# timelog
![](/UI/assets/timelog.png)

timelog is a web app for users to record how they use time.
It have been developed by node.js and mySQL.

# How to use
## Sever
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
```
#If NODE_ENV is production
warning: please use IANA standard timezone format ('Etc/GMT-8')
Server running at http://0.0.0.0:80/

# Else
warning: please use IANA standard timezone format ('Etc/GMT-8')
Server running at http://0.0.0.0:5000/
```

## Website

### login
![](/UI/assets/sampleLogin.png)
