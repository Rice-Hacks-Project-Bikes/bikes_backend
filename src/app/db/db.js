const { MongoClient, ServerApiVersion } = require('mongodb');

async function testMongo() {
	const uri = "mongodb+srv://BikeProj:B1k3%21%21@cluster0.ssoausz.mongodb.net/?retryWrites=true&w=majority";
	const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

	try {
		await client.connect();

		await listDatabases(client);
	}
	catch (e) { 
		console.error('Failed to connect to mongoDB and list databases');
		console.error(e);
	}

	finally {
		await client.close();
	}
}

async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

module.exports = { testMongo };
		

