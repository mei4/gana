const productController = require('./product/productController')
const path = require('path')

const getProducts = productController.getProducts
const addProduct = productController.addProduct
const getProductById = productController.getProductById
const deleteProduct = productController.deleteProduct

const routes = (app) => {
	app.route('/')
		.get((req, res) => {
			res.status(200).sendFile(path.join(`${__dirname}/index.html`));
		});

	app.route('/products')
		.get(getProducts)
		.post(addProduct)

	app.route('/products/:id')
		.get(getProductById)
		.delete(deleteProduct)
}

module.exports = routes