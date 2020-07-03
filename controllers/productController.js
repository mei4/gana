const mongoose = require('mongoose');
const productSchema = require('../models/productModel')

const Product = mongoose.model('Product', productSchema);

const addProduct = (req, res) => {
	const newProduct = new Product(req.body);
	
	newProduct.save((err, Product) => {
		res.status(401).send('Fuuuuuuuus')
	});
}

const getProducts = (req, res) => {
	Product.find({}, function (err, Product) {
		if (err) { res.send(err) }
		else { res.json(Product) }
	})
}

module.exports.addProduct = addProduct
module.exports.getProducts = getProducts