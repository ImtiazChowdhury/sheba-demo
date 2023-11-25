const request = require('supertest');
const { default: mongoClient } = require("@imtiazchowdhury/mongopool")

process.env.MONGO_URL = "mongodb://127.0.0.1:27017"
process.env.DB_NAME = "sheba_demo_test"

const app = require("../app")

let courseResponse, payload;
beforeEach(async () => {
    const coursePayload = {
        "title": "test course 101",
        "description": "Test course description",
        "instructor": "Imtiaz Chowdhury",
        "duration": 45,
        "price": 1000
    }
    courseResponse = await request(app).post("/course").send(coursePayload);
    payload = {
        student: "Shafin Ahmed",
        course: courseResponse?.body?._id
    }
})

afterAll(async () => {
    const db = await mongoClient.getDB();
    await db.dropDatabase();
    mongoClient.closeClient()
})

describe('POST: Course Enrollment API', () => {


    test("Should create an enrollment and return the enrollment object", async () => {
        
        const res = await request(app).post("/enrollment").send(payload);
        expect(res.statusCode).toBe(201);
        expect(res.body.student).toStrictEqual(payload.student);
        expect(res.body.course).toStrictEqual(payload.course);
        expect(res.body).toHaveProperty("_id");
        expect(res.body).toHaveProperty("enrollmentDate");
    })

    describe("Should respond error if required properties are not passed", () => {

        test("Should return error with student prop if student not passed  ", async () => {
            const res = await request(app).post("/enrollment").send({...payload, student: undefined});
            expect(res.statusCode).toBe(400);
            expect(res.body).toHaveProperty("student");
        })
        test("Should return error with course prop if course not passed  ", async () => {
            const res = await request(app).post("/enrollment").send({...payload, course: undefined});
            expect(res.statusCode).toBe(400);
            expect(res.body).toHaveProperty("course");
        })
       
    })

    describe("Should respond error if wrong type of data is passed", () => {

        test("Should return error with student prop if student is not string  ", async () => {
            const res = await request(app).post("/enrollment").send({...payload, student: 1234});
            expect(res.statusCode).toBe(400);
            expect(res.body).toHaveProperty("student");
        })
        test("Should return error with course prop if course is not string ", async () => {
            const res = await request(app).post("/enrollment").send({...payload, course: true});
            expect(res.statusCode).toBe(400);
            expect(res.body).toHaveProperty("course");
        })
        test("Should return error with course prop if course is not valid object Id ", async () => {
            const res = await request(app).post("/enrollment").send({...payload, course: "232332323"});
            expect(res.statusCode).toBe(400);
            expect(res.body).toHaveProperty("course");
        })
        test("Should return error with course prop if course with id does not exist ", async () => {
            const res = await request(app).post("/enrollment").send({...payload, course: "6561106fc29c0b5d2c30f012"}); //valid but does not exist
            expect(res.statusCode).toBe(400);
            expect(res.body).toHaveProperty("course");
        })
        
    })
});