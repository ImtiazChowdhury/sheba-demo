const {mongoDB} = require("@imtiazchowdhury/mongopool")

async function enrollmentCreateFormatter(input){
    const entity = {};

    entity.student = input.student.trim();
    entity.course = new mongoDB.ObjectId(input.course);

    entity.enrollmentDate = new Date();

    return entity;
}

module.exports = enrollmentCreateFormatter;