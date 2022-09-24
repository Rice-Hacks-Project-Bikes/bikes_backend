var express = require('express');
var router = express.Router();

/* send bike. */
router.get('/', function(req, res, next) {
	// TODO remove
	res.render('index', { title: 'BIKE Send' });

	msg.save()
	.then(doc => {
	  console.log(doc)
	})
	.catch(err => {
	  console.error(err)
	})
});

module.exports = router;

let BikeModel = require('../db/models/bikeModel.js')

let msg = new BikeModel({
  name: 'Trek Bike Test'
})
