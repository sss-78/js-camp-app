const { MongoClient, ServerApiVersion } = require('mongodb');
require("dotenv").config();

class ApplicationDB {
    #client
    #dbName
    #collection

    constructor() {
        this.#dbName = process.env.MONGO_DB_NAME;
        this.#collection = process.env.MONGO_COLLECTION;
    }
    
    async connect() {
        let userName = process.env.MONGO_DB_USERNAME;
        let password = process.env.MONGO_DB_PASSWORD;
        
        const uri = `mongodb+srv://${userName}:${password}@project4.ngo4oev.mongodb.net/?retryWrites=true&w=majority&appName=Project4`;
        this.#client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
        
        await this.#client.connect();
    }

    async listDatabases() {
        await this.connect();
        const dbsList = await this.#client.db().admin().listDatabases();
    
        console.log("Databases: ");
        dbsList.databases.forEach(db => {
            console.log(`DB Name: ${db.name}`);
        });
        console.log("Collection:");
        console.log(`${this.#collection}`);
    }

    async insertApplication(application) {
        //TODO connect to database and insert application into collection in database
    }

    async lookUpApplication(email) {
        //TODO connect to database and return all applications that meet the criteria

    }


    async lookUpGPA(gpa) {
        //TODO connect to database and return all applications that meet the criteria
    }

    async deleteAllApplications() {
       //TODO connect to database and remove all applications in collection
    }
}

module.exports = { ApplicationDB }