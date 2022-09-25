var express = require('express');
var router = express.Router();
let usersDB = require('../db/usersDB');
let UserModel = usersDB.model('User');

/* add user to the DB and pass back the userID to the front end */
router.get('/', async (req, res) => {
	try {

		var user = new UserModel({
			username: req.query.username,
			rentedBikes: []
		})

		await user.save()
		.then(doc => {
			console.log(doc);
			return res.status(200).send(user._id);
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
		res.status(500).send(`Something went wrong => ${error}`);
	}
});

module.exports = router;