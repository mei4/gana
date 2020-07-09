const express = require('express')
const path = require('path')
const swaggerUi = require('swagger-ui-express');
const openApiDocument = require('../openapi')
const favicon = require('serve-favicon');
const routes = require('./routes')

const app = express()

app.use(express.json())
app.use(favicon(path.join('./','public','images','favicon.ico')));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiDocument));
app.use((req, res, next) => {
   res.header("Access-Control-Allow-Origin", "*")
   next()
});

routes(app)

module.exports = app
