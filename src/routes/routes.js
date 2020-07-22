const productRoutes = require('./product-routes')
const path = require('path')
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const openApiDocument = YAML.load('./openapi.yaml');

const initRoutes = (app) => {
	app.use(/[/]/, (req, res) => {
		res.status(200).sendFile(path.resolve('src/index.html'));
	})
	app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiDocument));
	app.use('/products', productRoutes)
}

module.exports = initRoutes