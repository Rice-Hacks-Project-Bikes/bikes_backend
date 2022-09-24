let mongoose = require('mongoose')

let bikeSchema = new mongoose.Schema({
	name: String
})

module.exports = mongoose.model('Bike', bikeSchema)