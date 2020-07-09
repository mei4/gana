const express = require('express')
const path = require('path')
const favicon = require('serve-favicon');
const routes = require('./routes')
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const openApiDocument = YAML.load('./openapi.yaml');

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
