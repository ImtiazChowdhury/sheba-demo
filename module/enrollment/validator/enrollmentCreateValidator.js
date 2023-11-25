const {mongoDB} = require("@imtiazchowdhury/mongopool");
const CourseOperation = require("../../course/operation/CourseOperation");
const courseOperation = new CourseOperation()

async function enrollmentCreateValidator(input) {
    const errors = {};;

    if (!input.student) {
        errors.student = "Course student name can not be empty"
    } else if (typeof input.student !== "string") {
        errors.student = "Course student name must be string"
    } else if (input.student.trim().length < 3) {
        errors.student = "Course student name too short"
    }
    if(!input.course){
        errors.course = "Course Id is required"
    }else if(!mongoDB.ObjectId.isValid(input.course)){
        errors.course = "Invalid course Id"
    }else{
        try{
            const courseDetail = await courseOperation.detail(input.course);
            if(!courseDetail) errors.course = "No course found with given id"
        }catch(err){
            errors.course = err.message
        }
    }


    if (Object.keys(errors).length) return errors;
    return false;


}

module.exports = enrollmentCreateValidator;