const request = require('supertest');
const { default: mongoClient } = require("@imtiazchowdhury/mongopool")

process.env.MONGO_URL = "mongodb://127.0.0.1:27017"
process.env.DB_NAME = "sheba_demo_test"

const app = require("../app")

beforeAll(done => {
    done()
})

afterAll(async () => {
    const db = await mongoClient.getDB();
    await db.dropDatabase();
    mongoClient.closeClient()
})

describe('POST: Course Create API', () => {

    const payload = {
        "title": "test course 101",
        "description": "Test course description",
        "instructor": "Imtiaz Chowdhury",
        "duration": 45,
        "price": 1000
    }

    test("Should create a course and return the course object", async () => {
        const res = await request(app).post("/course").send(payload);
        expect(res.statusCode).toBe(201);
        expect(res.body.title).toStrictEqual(payload.title);
        expect(res.body.description).toStrictEqual(payload.description);
        expect(res.body.instructor).toStrictEqual(payload.instructor);
        expect(res.body.duration).toStrictEqual(payload.duration);
        expect(res.body.price).toStrictEqual(payload.price);
        expect(res.body).toHaveProperty("_id");
    })

    describe("Should respond error if required properties are not passed", () => {

        test("Should return error with title prop if title not passed  ", async () => {
            const res = await request(app).post("/course").send({...payload, title: undefined});
            expect(res.statusCode).toBe(400);
            expect(res.body).toHaveProperty("title");
        })
        test("Should return error with description prop if description not passed  ", async () => {
            const res = await request(app).post("/course").send({...payload, description: undefined});
            expect(res.statusCode).toBe(400);
            expect(res.body).toHaveProperty("description");
        })
        test("Should return error with instructor prop if instructor not passed  ", async () => {
            const res = await request(app).post("/course").send({...payload, instructor: undefined});
            expect(res.statusCode).toBe(400);
            expect(res.body).toHaveProperty("instructor");
        })
        test("Should return error with duration prop if duration not passed  ", async () => {
            const res = await request(app).post("/course").send({...payload, duration: undefined});
            expect(res.statusCode).toBe(400);
            expect(res.body).toHaveProperty("duration");
        })
        test("Should return error with price prop if price not passed  ", async () => {
            const res = await request(app).post("/course").send({...payload, price: undefined});
            expect(res.statusCode).toBe(400);
            expect(res.body).toHaveProperty("price");
        })
    })

    describe("Should respond error if wrong type of data is passed", () => {

        test("Should return error with title prop if title is not string  ", async () => {
            const res = await request(app).post("/course").send({...payload, title: 1234});
            expect(res.statusCode).toBe(400);
            expect(res.body).toHaveProperty("title");
        })
        test("Should return error with description prop if description is not string  ", async () => {
            const res = await request(app).post("/course").send({...payload, description: true});
            expect(res.statusCode).toBe(400);
            expect(res.body).toHaveProperty("description");
        })
        test("Should return error with instructor prop if instructor is not string  ", async () => {
            const res = await request(app).post("/course").send({...payload, instructor: {name: "Imtiaz"}});
            expect(res.statusCode).toBe(400);
            expect(res.body).toHaveProperty("instructor");
        })
        test("Should return error with duration prop if duration is not number", async () => {
            const res = await request(app).post("/course").send({...payload, duration: [234]});
            expect(res.statusCode).toBe(400);
            expect(res.body).toHaveProperty("duration");
        })
        test("Should return error with price prop if price is not string  ", async () => {
            const res = await request(app).post("/course").send({...payload, price: "100$"});
            expect(res.statusCode).toBe(400);
            expect(res.body).toHaveProperty("price");
        })
    })
});