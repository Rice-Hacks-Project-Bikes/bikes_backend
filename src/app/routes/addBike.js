var express = require('express');
var router = express.Router();
let BikeModel = require('../db/models/bikeModel');

/* add bike to bikes database */
router.get('/', async (req, res) => {
	try {

		var bike = new BikeModel({
			title: req.query.title,
			brand: req.query.brand,
			model: req.query.Model,
			year: req.query.Year,
			style: req.query.style,
			frameSize: req.query.frameSize, 
			storage: req.query.storage,
			photos: req.query.photos
		})

		await bike.save()
		.then(doc => {
			console.log(doc);
			return res.sendStatus(200);
		})

	} catch (error) {

		if (error.name === "ValidationError") {
			let errors = {};
	
			Object.keys(error.errors).forEach((key) => {
				errors[key] = error.errors[key].message;
			});

			console.error(errors);
			return res.status(400).send(errors);
		}
		console.error(error);
		res.status(500).send("Something went wrong");
	}
});

module.exports = router;