const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb')
require("dotenv").config()

class ApplicationDB {
    #client
    #dbName
    #collection

    constructor() {
        this.#dbName = process.env.MONGO_DB_NAME
        this.#collection = process.env.MONGO_COLLECTION
    }

    async connect() {
        let userName = process.env.MONGO_DB_USERNAME
        let password = process.env.MONGO_DB_PASSWORD

        const uri = `mongodb+srv://${userName}:${password}@project4.ngo4oev.mongodb.net/?retryWrites=true&w=majority&appName=Project4`
        this.#client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 })

        await this.#client.connect()
    }

    async listDatabases() {
        await this.connect()
        const dbsList = await this.#client.db().admin().listDatabases()

        console.log("Databases: ")
        dbsList.databases.forEach(db => {
            console.log(`DB Name: ${db.name}`)
        })
        console.log("Collection:")
        console.log(`${this.#collection}`)
    }

    async insertApplication(application) {
        //TODO connect to database and insert application into collection in database
        await this.connect()
        const result = await this.#client.db(this.#dbName).collection(this.#collection).insertOne(application)
        // console.log(`Application entry created with id ${result.insertedId}`)

        const applicants =
            await this.#client.db(this.#dbName).collection(this.#collection).find({}).toArray()

        // console.log('Applicants:', applicants)
    }

    async lookUpApplication(email) {
        await this.connect()
        //TODO connect to database and return all applications that meet the criteria
        let filter = { email: email }

        const result = await this.#client.db(this.#dbName).collection(this.#collection).find(filter).toArray()

        if (result) {
            // console.log(result)
            return result
        } else {
            // console.log('not found')
            return []
        }
    }

    async lookUpGPA(gpa) {
        await this.connect()
        //TODO connect to database and return all applications that meet the criteria
        let filter = { gpa: { $gte: gpa } }
        const result = await this.#client.db(this.#dbName).collection(this.#collection).find(filter).toArray()

        if (result) {
            // console.log(result)
            return result
        } else {
            // console.log('not found')
            return []
        }
    }

    async lookUpID(id) {
        await this.connect()
        let filter = { _id: ObjectId(id) }

        const result = await this.#client.db(this.#dbName).collection(this.#collection).find(filter).toArray()

        if (result) {
            // console.log(result)
            return result
        } else {
            // console.log('not found')
            return []
        }
    }

    async updateID(id, application) {
        await this.connect()
        let filter = { _id: ObjectId(id) }
        let update = { $set: application }

        const result = await this.#client.db(this.#dbName).collection(this.#collection).updateOne(filter, update)

        if (result) {
            // console.log(result)
            return result
        } else {
            // console.log('not found')
            return []
        }
    }

    async deleteID(id) {
        await this.connect()
        let filter = { _id: ObjectId(id) }

        const result = await this.#client.db(this.#dbName).collection(this.#collection).deleteOne(filter)

        if (result) {
            // console.log(result)
            return result
        } else {
            // console.log('not found')
            return []
        }
    }

    async filterByGPAWithComparison(gpa, comparison) {
        await this.connect()
        let operators = [{ operator: "equal", symbol: "$eq" }, { operator: "not equal", symbol: "$ne" }, { operator: "greater than", symbol: "$gt" },
        { operator: "less than", symbol: "$lt" }, { operator: "greater than or equal", symbol: "$gte" }, { operator: "less than or equal", symbol: "$lte" }]

        // console.log(gpa, comparison)

        /* Clearing Quotations */
        gpa = gpa.slice(1, -1)
        comparison = comparison.slice(1, -1)

        let operator = operators.filter(item => item.operator === comparison)[0].symbol
        // console.log(operator)

        let filter = { gpa: { [operator]: gpa } }
        const result = await this.#client.db(this.#dbName).collection(this.#collection).find(filter).toArray()

        if (result) {
            // console.log(result)
            return result
        } else {
            // console.log('not found')
            return []
        }
    }

    async deleteAllApplications() {
        //TODO connect to database and remove all applications in collection
        try {
            await this.connect()
            const result = await this.#client.db(this.#dbName).collection(this.#collection).deleteMany({})
            // console.log(`Deleted applicants ${result.deletedCount}`)
            return result.deletedCount
        } catch (e) {
            console.error(e)
        } finally {
            await this.#client.close()
        }
    }
}

module.exports = { ApplicationDB }