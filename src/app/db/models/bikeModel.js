let mongoose = require('mongoose')

let bikeSchema = new mongoose.Schema({
	title: {
		type: String,
		required: [true, 'Bike must have a title'] 
	},
	brand: {
		type: String,
		required: false
	},
	Model: {
		type: String,
		required: false
	},
	Year: {
		type: Number,
		min: [1950, 'Bike is too old'],
		max: [new Date().getFullYear(), "The year {VALUE} hasn't happened yet"],
		required: false,
		validate : {
			validator : Number.isInteger,
			message   : '{VALUE} is not an integer value'
		}
	},
	style: {
		type: String,
		enum: ['Road', 'Mountain', 'Hybrid', 'Commuter'],
		required: true
	},
	frameSize: {
		// bike sizes can get confusing because different types are measured different ways
		type: String,
		required: [true, 'Bike must have a frame size']
	}, 
	storage: {
		type: Boolean,
		required: false
	},
	photos: {
		// list of photo ids for this listing
		type: [Number], 
		required: true
		// TODO add validation to make sure there are at least X pics for bike
	}
})

module.exports = mongoose.model('Bike', bikeSchema)