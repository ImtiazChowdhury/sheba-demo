const { mongoDB } = require("@imtiazchowdhury/mongopool")

async function courseListValidator(query) {
    const errors = {};;

    if (query.id && !Array.isArray(query.id)) {
        errors.id = "Filter Id Must be array"
    }
    if (query.id && Array.isArray(query.id) && !query.id.every(i => mongoDB.ObjectId.isValid(i))) {
        errors.id = "Invalid id"
    }


    if (Object.keys(errors).length) return errors;
    return false;
}
module.exports.courseListValidator = courseListValidator;

async function courseDetailValidator(id) {
    const errors = {};;
    
    if (!mongoDB.ObjectId.isValid(id)) {
        errors.id = "Invalid id"
    }
    
    
    if (Object.keys(errors).length) return errors;
    return false;
}
module.exports.courseDetailValidator = courseDetailValidator;