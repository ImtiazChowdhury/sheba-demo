const listCourse = require("./listCourse");

const { default: mongoClient, mongoDB } = require("@imtiazchowdhury/mongopool");

class CourseDB {

    constructor() {
        this.collectionName = "course"
    }

    async writeOne(entity) {
        const db = await mongoClient.getDB();
        const writeResult = await db.collection(this.collectionName).insertOne(entity)
        return writeResult;
    }


    async list(filter, paginationOptions) {
        return await listCourse(filter, paginationOptions)
    }

    async detail(id) {
        const db = await mongoClient.getDB();
        const detail = await db.collection(this.collectionName).findOne({ _id: new mongoDB.ObjectId(id) })
        return detail;
    }
}

module.exports = CourseDB;