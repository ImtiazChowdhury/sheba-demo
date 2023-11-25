const CourseDB = require("../../../database/course/CourseDB");
const HTTPException = require("../../../lib/HttpException");
const courseCreateFormatter = require("../formatter/courseCreateFormatter");
const { courseListValidator, courseDetailValidator } = require("../validator/CourseParamValidator");
const courseCreateValidator = require("../validator/courseCreateValidator");

class CourseOperation {

    constructor() {
        this.db = new CourseDB()
    }

    async create(input) {

        const validationErrors = await courseCreateValidator(input)
        if (validationErrors) throw new HTTPException(400, "Invalid input", validationErrors)

        const formattedEntity = await courseCreateFormatter(input);

        const writeResult = await this.db.writeOne(formattedEntity);

        return {
            ...formattedEntity,
            _id: writeResult.insertedId
        };

    }

    async list(filter, paginationOptions) {
        const validationErrors = await courseListValidator(filter)
        if (validationErrors) throw new HTTPException(400, "Invalid input", validationErrors)

        return await this.db.list(filter, paginationOptions)
    }

    async detail(id) {
        const validationErrors = await courseDetailValidator(id)
        if (validationErrors) throw new HTTPException(400, "Invalid input", validationErrors)

        const detailResult = await this.db.detail(id);
        if (!detailResult) throw new HTTPException(400, "Item not found", {id: "No record found with id"})

        return detailResult;
    }

}

module.exports = CourseOperation;

