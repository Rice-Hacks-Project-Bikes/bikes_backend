let mongoose = require('mongoose')

let userSchema = new mongoose.Schema({
	username: {
		type: String,
		lowercase: true,
		trim: true,
		match: new RegExp('^\\S*$'),
		maxLength: 12,
		index: true,
    	unique: true,
		required: true
	},
	rentedBikes: {
		type: [mongoose.ObjectId],
		required: true
	}
})

module.exports = userSchema