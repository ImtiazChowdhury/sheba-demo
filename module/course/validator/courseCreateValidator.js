async function courseCreateValidator(input) {
    const errors = {};;

    if (!input.title) {
        errors.title = "Course title can not be empty"
    } else if (typeof input.title !== "string") {
        errors.title = "Course title must be string"
    } else if (input.title.trim().length < 3) {
        errors.title = "Course title too short"
    }

    if (!input.description) {
        errors.description = "Course description can not be empty"
    } else if (typeof input.description !== "string") {
        errors.description = "Course description must be string"
    } else if (input.description.trim().length < 3) {
        errors.description = "Course description too short"
    }

    if (!input.instructor) {
        errors.instructor = "Course instructor can not be empty"
    } else if (typeof input.instructor !== "string") {
        errors.instructor = "Course instructor must be string"
    }

    if (!input.duration) {
        errors.duration = "Course duration can not be empty"
    } else if (typeof input.duration !== "number") {
        errors.duration = "Course duration must be number"
    } else if (!isFinite(input.duration) || input.duration <= 0 || isNaN(input.duration)) {
        errors.duration = "Course duration must be a valid positive number"
    }

    if (!input.price) {
        errors.price = "Course price can not be empty"
    } else if (typeof input.price !== "number") {
        errors.price = "Course price must be number"
    } else if (!isFinite(input.price) || input.price < 0 || isNaN(input.duration)) {
        errors.price = "Course price must be a valid number"
    }


    if (Object.keys(errors).length) return errors;
    return false;


}

module.exports = courseCreateValidator;