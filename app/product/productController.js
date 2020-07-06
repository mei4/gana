const mongoose = require('mongoose');
const productSchema = require('./productModel')

const Product = mongoose.model('Product', productSchema);

const getProducts = (req, res) => {
	Product.find({}, function (err, Product) {
		if (err) { res.send(err) }
		else { res.json(Product) }
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
	
	res.status(401).send("ERROR")
}

module.exports.getProducts = getProducts
module.exports.getProductById = getProductById
module.exports.addProduct = addProduct