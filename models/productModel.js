const mongoose = require('mongoose')

const Schema = mongoose.Schema

const productSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	dateAdded: {
		type: Date,
		default: Date.now,
		required: true
	},
	expirationDate: {
		type: Date
	}
	
})

module.exports = productSchema
