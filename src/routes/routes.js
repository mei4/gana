const loginRoutes = require('./login-routes')
const path = require('path')
const productRoutes = require('./product-routes')
const YAML = require('yamljs');
const openApiDocument = YAML.load('./openapi.yaml');
const swaggerUi = require('swagger-ui-express');

const routes = (app) => {
	app.use(/[/]/, (req, res) => {
		res.status(200).sendFile(path.resolve('src/index.html'));
	})
	app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiDocument));
	app.use('/login', loginRoutes)
	app.use('/products', productRoutes)
}

module.exports = routes