const EnrollmentOperation = require("./operation/EnrollmentOperation");

class EnrollmentApi {
    constructor({ queryParser, parameterParser, formParser }) {
        this.operation = new EnrollmentOperation()
        this.queryParser = queryParser;
        this.parameterParser = parameterParser;
        this.formParser = formParser;
    }

    async create(req) {
        const formData = await this.formParser(req);
        return await this.operation.create(formData);
    }
}



module.exports = EnrollmentApi;