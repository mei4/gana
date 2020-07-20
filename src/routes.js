const productController = require('./product/product-controller')
const path = require('path')
const checkAuth = require('./middleware/check-auth')

const getProducts = productController.getProducts
const addProduct = productController.addProduct
const getProductById = productController.getProductById
const updateProduct = productController.updateProduct
const deleteProduct = productController.deleteProduct

const routes = (app) => {
	app.route('/')
		.get((req, res) => {
			res.status(200).sendFile(path.join(`${__dirname}/index.html`));
		});

	app.route('/products')
		.get(getProducts)
		.post(checkAuth, addProduct)

	app.route('/products/:id')
		.get(getProductById)
		.put(checkAuth, updateProduct)
		.delete(checkAuth, deleteProduct)
}

module.exports = routes