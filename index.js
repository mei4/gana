const favicon = require('serve-favicon');
const path = require('path')
const mongoose = require('mongoose')
const express = require('express')
const routes = require('./src/routes')

const hostname = "127.0.0.1";
const port = 4000;
const app = express()

app.use(express.json())
app.use(favicon(path.join(__dirname,'public','images','favicon.ico')));

app.listen(port, hostname, () => {
   console.log(`Server running at http://${hostname}:${port}/`)
})

mongoose.connect('mongodb://127.0.0.1:27017/groceriesDB', {
   "useNewUrlParser": true,
   "useUnifiedTopology": true
});

routes(app)