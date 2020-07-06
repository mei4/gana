const productController = require('./product/productController')

const getProducts = productController.getProducts
const getProductById = productController.getProductById
const addProduct = productController.addProduct

const path = require('path')

const routes = (app) => {
	app.route('/')
		.get((req, res) => {
			res.sendFile(path.join(`${__dirname}/index.html`));
		});

	app.route('/products')
		.get(getProducts)
		.post(addProduct)

	app.route('/products/:id')
		.get(getProductById)
}

module.exports = routes