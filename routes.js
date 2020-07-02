const productController = require('./controllers/productController')

const addProduct = productController.addProduct
const getProducts = productController.getProducts

const path = require('path')

const routes = (app) => {
	app.route('/')
		.get((req, res) => {
			res.sendFile(path.join(__dirname + '/index.html'));
		});

	app.route('/products')
		.get(getProducts)
		.post(addProduct)
}

module.exports = routes