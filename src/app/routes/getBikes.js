var express = require('express');
var router = express.Router();
let bikesDB = require('../db/bikesDB');
let BikeModel = bikesDB.model('openBike');

/* GET bikes. Only gets bikes that aren't currently rented */
router.get('/', async (req, res) => {
	// TODO we should be having a dynamic search for titles but static for all other attribs

	// radius to search in meters (m)
	let radius = req.query.radius

	if (!radius) { 
		// radius is undefined use default value of 100m
		radius = 100
	}

	if (!req.query.lat || !req.query.long) {
		return res.status(400).send('Latitude and longitude to search around must be provided');
	}

	let locSearch = {
		location: {
			$near: {
				$maxDistance: radius,
				$geometry: {
					type: "Point",
					coordinates: [req.query.long, req.query.lat]
				}
			}
		}
	}

	search = {...locSearch, ...req.query};
	delete search['lat'];
	delete search['long'];
	if (search.hasOwnProperty('radius')) {
		delete search['radius'];
	}
	search['rented'] = false;

	const results = await BikeModel.find(search).exec();

	console.log(`getBikes request ${JSON.stringify(req.query)} => ${JSON.stringify(results) === '[]' ? 'None' : results}`) 
	return res.status(200).send(results);
});

module.exports = router;