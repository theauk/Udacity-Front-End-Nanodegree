import 'regenerator-runtime/runtime';
const request = require('supertest');
const { server }  = require('../src/server/index');

// For closing the server after testing
afterAll(async () => {
    server.close();
  });

describe("Test the path '/test'", () => {
    test("The GET request should respond with working", async () => {
        const response = await request(server).get("/test");
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe("Working");
    });
});