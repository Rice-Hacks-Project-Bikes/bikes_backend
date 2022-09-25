var express = require('express');
var router = express.Router();
let BikeModel = require('../db/models/bikeModel');

/* GET bikes. */
router.get('/', async (req, res) => {
	// TODO we should be having a dynamic search for titles but static for all other attribs
	const results = await BikeModel.find(req.query).exec();

	console.log(`getBikes request ${JSON.stringify(req.query)} => ${JSON.stringify(results) === '[]' ? 'None' : results}`) 
	return res.status(200).send(results);
});

module.exports = router;