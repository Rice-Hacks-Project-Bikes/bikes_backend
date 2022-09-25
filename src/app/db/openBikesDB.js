let mongoose = require('mongoose');

let bikesDB;
try {
	bikesDB = mongoose.createConnection('mongodb+srv://BikeProj:B1k3%21%21@cluster0.ssoausz.mongodb.net/bikes?retryWrites=true&w=majority')
} catch(err) {
	console.error(`Connection to bikes DB error: =>${err}`)
	return;
}	

bikesDB.model('openBike', require('./models/openBikeSchema'));
 
console.log('Successfully connected to Open Bikes DB!')

module.exports = bikesDB;