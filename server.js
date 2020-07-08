const mongoose = require('mongoose')
const routes = require('./src/routes')

const hostname = "127.0.0.1";
const port = 4000;

const app = require('./src/app')

app.listen(port, hostname, () => {
   console.log(`Server running at http://${hostname}:${port}/`)
})

mongoose.connect('mongodb://127.0.0.1:27017/groceriesDB', {
   "useNewUrlParser": true,
   "useUnifiedTopology": true
});
mongoose.set('useCreateIndex', true)

routes(app)