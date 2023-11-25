const EnrollmentDB = require("../../../database/enrollment/EnrollmentDB");
const HTTPException = require("../../../lib/HttpException");
const enrollmentCreateFormatter = require("../formatter/enrollmentCreateFormatter");
const enrollmentCreateValidator = require("../validator/enrollmentCreateValidator");

class EnrollmentOperation {

    constructor() {
        this.db = new EnrollmentDB()
    }

    async create(input) {

        const validationErrors = await enrollmentCreateValidator(input)
        if (validationErrors) throw new HTTPException(400, "Invalid input", validationErrors)

        const formattedEntity = await enrollmentCreateFormatter(input);

        const writeResult = await this.db.writeOne(formattedEntity);

        return {
            ...formattedEntity,
            _id: writeResult.insertedId
        };

    }

}

module.exports = EnrollmentOperation;

