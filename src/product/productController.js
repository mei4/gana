const Product = require('./productModel')

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

const getProductById = (req, res) => {
	Product.findById(req.params.id, (err, product) => {
		if (err) { res.send(err) }
		else { res.json(product) }
	})
}

const deleteProduct = (req, res) => {
	const requestId = req.params.id
	Product.findByIdAndDelete(requestId, (err, product) => {
		if (err) { res.send(err) }
		else { 
			if (!product) res.json({ message : `Product with id [${requestId}] does not exist.`})
			else res.json({ message : `Product [${product.name}] was succesfully deleted.` })
		}
	})
}

module.exports.getProducts = getProducts
module.exports.addProduct = addProduct
module.exports.getProductById = getProductById
module.exports.deleteProduct = deleteProduct