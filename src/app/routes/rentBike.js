var express = require('express');
var router = express.Router();
let bikesDB = require('../db/bikesDB');
let BikeModel = bikesDB.model('openBike');

/* Rents bike out to a user, responds when user's time is up? 
	Time is in minutes
*/
router.get('/', async (req, res) => {
	if (!req.bikeId || !req.userId || !req.time ) {
		return res.status(400).send('Need a userId, bikeId, and time');
	}

	try {
		BikeModel.where({ _id: req.bikeId }).update({ rented: true, rentedBy: req.userId });
	} catch (error) {
		console.error(error);
		res.status(500).send(`Something went wrong => ${error}`);
	}

	// wait for time reserved
	minutes = req.time; 
										// convert to ms
	await new Promise(r => setTimeout(r, minutes * 60000));
	
	// set bike back to unreserved
	try {
		BikeModel.where({ _id: req.bikeId }).update({ rented: false, rentedBy: [] });
	} catch (error) {
		console.error(error);
		res.status(500).send(`Something went wrong => ${error}`);
	}

	return res.status(200);
});

module.exports = router;