const CourseOperation = require("./operation/CourseOperation");

class CourseApi {
    constructor({ queryParser, parameterParser, formParser }) {
        this.operation = new CourseOperation()
        this.queryParser = queryParser;
        this.parameterParser = parameterParser;
        this.formParser = formParser;
    }

    async create(req) {
        const formData = await this.formParser(req);
        return await this.operation.create(formData);
    }

    async list(req) {
        const query = await this.queryParser(req);
        const filter = {
            id: query.id && query.id.split(",").map(i => i.trim()),
            instructor: query.instructor && query.instructor.split(",").map(i => i.trim()),
            duration: query.duration && parseInt(query.duration),
            price: query.price && parseFloat(query.price)
        }
        const paginationOptions = {
            limit: query.limit ? parseInt(query.limit) : 50,
            page: query.page ? parseInt(query.page) : 1,
            sort: query.sort && query.sort.trim(),
            sortOrder: query.sortOrder == "1" ? 1 : -1
        }

        return await this.operation.list(filter, paginationOptions)
    }

    async detail(req) {
        const params = await this.parameterParser(req)
        return await this.operation.detail(params.id)
    }
}



module.exports = CourseApi;