import 'regenerator-runtime/runtime';
const request = require('supertest');
const app = require('../src/server/index.js');

describe("Test the path '/test'", () => {
    test("The GET request should respond with working", async () => {
        const response = await request(app).get("/test");
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe("Working");
    });
});