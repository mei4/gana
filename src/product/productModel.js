const mongoose = require('mongoose')

const Schema = mongoose.Schema

const productSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	dateAdded: {
		type: Date,
		default: Date.now,
		required: true
	},
	expirationDate: {
		type: Date
	},
	amount: {
		type: Number,
		default: 0,
		required: true
	}
})

module.exports = productSchema
