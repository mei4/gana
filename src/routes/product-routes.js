const express = require('express')
const checkAuth = require('../middleware/check-auth')
const productController = require('../controllers/product-controller')
const router = express.Router()

const getProducts = productController.getProducts
const addProduct = productController.addProduct
const getProductById = productController.getProductById
const updateProduct = productController.updateProduct
const deleteProduct = productController.deleteProduct

router.get('/', getProducts)
router.get('/:id', getProductById)

router.post('/', checkAuth, addProduct)

router.put('/:id', checkAuth, updateProduct)

router.delete('/:id', checkAuth, deleteProduct)

module.exports = router