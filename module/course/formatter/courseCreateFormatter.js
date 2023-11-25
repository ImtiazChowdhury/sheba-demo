async function courseCreateFormatter(input){
    const entity = {};

    entity.title = input.title.trim();
    entity.description = input.description.trim();
    entity.instructor = input.instructor.trim();
    entity.duration = parseInt(input.duration);
    entity.price = parseFloat(input.price);

    return entity;
}

module.exports = courseCreateFormatter;