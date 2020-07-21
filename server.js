const mongoose = require('mongoose')
require('dotenv').config()

const hostname = process.env.HOST;
const port = process.env.PORT;

const app = require('./src/app')

app.listen(port, hostname, () => {
   console.log(`Server running at http://${hostname}:${port}/`)
})

mongoose.connect('mongodb://127.0.0.1:27017/groceriesDB', {
   "useNewUrlParser": true,
   "useUnifiedTopology": true,
   "useFindAndModify": false
});
mongoose.set('useCreateIndex', true)

