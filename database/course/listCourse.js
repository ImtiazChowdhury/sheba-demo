const { default: paginate } = require("mongodb-paginate");
const { mongoDB } = require("@imtiazchowdhury/mongopool")

async function listCourse(filter, paginationOptions) {

    const prePagingStage = [];

    if (filter.id) {
        prePagingStage.push({
            $match: {
                _id: { $in: filter.id.map(i => new mongoDB.ObjectId(i)) }
            }
        })
    }
    if (filter.instructor) {
        prePagingStage.push({
            $match: {
                instructor: { $in: filter.instructor }
            }
        })
    }

    if (filter.duration) {
        prePagingStage.push({
            $match: {
                duration: filter.duration
            }
        })
    }

    if (filter.price) {
        prePagingStage.push({
            $match: {
                price: filter.price
            }
        })
    }

    return await paginate("course", prePagingStage, [], paginationOptions)

}

module.exports = listCourse;