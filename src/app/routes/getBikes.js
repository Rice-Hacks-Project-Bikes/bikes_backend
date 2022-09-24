var express = require('express');
var router = express.Router();

/* GET bikes. */
router.get('/', function(req, res, next) {
	// TODO remove
	res.render('index', { title: 'BIKE' });

	var mongo = require('../db/db.js');
	mongo.testMongo().catch(console.error);
});

module.exports = router;