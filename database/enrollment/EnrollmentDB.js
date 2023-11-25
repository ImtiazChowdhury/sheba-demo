const { default: mongoClient, mongoDB } = require("@imtiazchowdhury/mongopool");

class EnrollmentDB {

    constructor() {
        this.collectionName = "enrollment"
    }

    async writeOne(entity) {
        const db = await mongoClient.getDB();
        const writeResult = await db.collection(this.collectionName).insertOne(entity)
        return writeResult;
    }

}

module.exports = EnrollmentDB;