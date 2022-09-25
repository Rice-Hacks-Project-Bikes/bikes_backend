let mongoose = require('mongoose')

let bikeSchema = new mongoose.Schema({
	title: {
		type: String,
		required: [true, 'Bike must have a title'] 
	},
	location: {
		type: [Number],
		required: [true, 'Bike must have a current location'],
		validate: {
			validator: validateLoc,
			message: 'Coordinates must be formated as an array of exactly 2 decimal numbers with precision 5 or greater and must be valid coordinates in the DD system.'
		}
	},
	brand: {
		type: String,
		required: false
	},
	model: {
		type: String,
		required: false
	},
	year: {
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
		// TODO setting to false for now until we can get these working
		required: false
		// TODO add validation to make sure there are at least X pics for bike
	}
})

function validateLoc(loc) {
	if (loc.length != 2) {
		return false;
	}

	for (let i = 0; i < 2; i++) {
				// decimal 			5 points of percision 
		if (!(loc[i] % 1 != 0 && loc[i].toString().split(".")[1].length >= 5)) {
			return false;
		}
		if (i == 0 && (loc[i] < -90 || loc[i] > 90)) {
			return false;
		}
		if (i == 1 && (loc[i] < -180 || loc[i] > 180)) {
			return false;
		}
	}
	return true;
}

module.exports = mongoose.model('Bike', bikeSchema)