const favicon = require('serve-favicon');
const path = require('path')
const mongoose = require('mongoose')
const express = require('express')
const routes = require('./src/routes')
const swaggerUi = require('swagger-ui-express');
const openApiDocumentation = require('./openApiDocumentation');

const hostname = "127.0.0.1";
const port = 4000;
const app = express()

app.use(express.json())
app.use(favicon(path.join(__dirname,'public','images','favicon.ico')));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiDocumentation));
app.use((req, res, next) => {
   res.header("Access-Control-Allow-Origin", "http://localhost:4000/api-docs/")
   res.header("Vary", "Referer")
   next()
});

app.listen(port, hostname, () => {
   console.log(`Server running at http://${hostname}:${port}/`)
})

mongoose.connect('mongodb://127.0.0.1:27017/groceriesDB', {
   "useNewUrlParser": true,
   "useUnifiedTopology": true
});

routes(app)