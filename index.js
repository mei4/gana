const hostname = "127.0.0.1";
const port = 4000;

const mongoose = require('mongoose')
const express = require('express')
const routes = require('./routes')

const app = express()
app.use(express.json())


routes(app)

app.listen(port, hostname, () => {
   console.log(`Server running at http://${hostname}:${port}/`)
})

mongoose.connect('mongodb://127.0.0.1:27017/groceriesDB', {
   "useNewUrlParser": true,
   "useUnifiedTopology": true
});