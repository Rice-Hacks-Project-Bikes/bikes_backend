let mongoose = require('mongoose');

let usersDB;
try {
	usersDB = mongoose.createConnection('mongodb+srv://BikeProj:B1k3%21%21@cluster0.ssoausz.mongodb.net/users?retryWrites=true&w=majority')
} catch(err) {
	console.error(`Connection to Ssers DB error: =>${err}`)
	return;
}	

usersDB.model('User', require('./models/userSchema'));

console.log('Successfully connected to Users DB!')

module.exports = usersDB;