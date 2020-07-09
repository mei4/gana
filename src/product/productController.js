const mongoose = require('mongoose');
const productSchema = require('./productModel')
var os = require("os");

const Product = mongoose.model('Product', productSchema);

const getProducts = (req, res) => {
	Product
		.find()
		.select('-__v')
		.exec()
		.then(products => {
			const result = products.map(product => {
				return {
					product: product,
					url: `http://${req.get('host')}${req.path}/${product._id}`
				}
			})
			res.status(200).json(result)
		})
}

const getProductById = (req, res) => {
	Product.findById(req.params.id, function (err, Product) {
		if (err) { res.send(err) }
		else { res.json(Product) }
	})
}

const addProduct = (req, res) => {
	const newProduct = new Product(req.body);
	
	newProduct
		.save()
		.then(result => {
			res.status(201).json(result)
		})
		.catch(err => res.status(409).json({
			message: err.message,
			error: err
		}))
}

module.exports.getProducts = getProducts
module.exports.getProductById = getProductById
module.exports.addProduct = addProduct