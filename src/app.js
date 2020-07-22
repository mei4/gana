const express = require('express')
const path = require('path')
const favicon = require('serve-favicon');
const initRoutes = require('./routes/routes');

const app = express()

app.use(express.json())
app.use(favicon(path.join('./','public','images','favicon.ico')));
app.use((req, res, next) => {
   res.header('Access-Control-Allow-Origin', '*')
   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
   res.header('Access-Control-Allow-Headers', 'Content-Type, api_key, Authorization')
   
   next()
});

initRoutes(app)

module.exports = app

