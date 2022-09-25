let mongoose = require('mongoose')

let userSchema = new mongoose.Schema({
	username: {
		type: String,
		lowercase: true,
		trim: true,
		match: '\S*',
		maxLength: 12,
		index: true,
    	unique: true
	}
})

module.exports = userSchema