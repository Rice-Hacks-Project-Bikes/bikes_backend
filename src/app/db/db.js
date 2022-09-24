let mongoose = require('mongoose');

class Database {
  	constructor() {
    	this._connect()
	}
  
	_connect() {
		mongoose.connect('mongodb+srv://BikeProj:B1k3%21%21@cluster0.ssoausz.mongodb.net/bikes?retryWrites=true&w=majority')
		.then(() => {
			console.log('Database connection successful')
		})
		.catch(err => {
			console.error('Database connection error')
		})
	}
}

module.exports = new Database()