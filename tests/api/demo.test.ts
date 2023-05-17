import request from "supertest";
import { createApplicationServices } from "../../src/services/ApplicationServices";
import { createExpressApp } from "../../src/config/express-config";

// Create the express app (without actually starting a http server)
const appServices = createApplicationServices();
const app = createExpressApp(appServices);

describe("Demo API", () => {
  it("should return an array of strings with given length", async () => {
    const numElements = 2;
    const res = await request(app).get(
      `/api/demo/message?length=${numElements}`
    );

    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy;
    expect(res.body.length).toBe(numElements);
    for (let i = 0; i < numElements; i++) {
      expect(typeof res.body[i] === "string").toBeTruthy;
    }
  });

  it("should return arrays of max length 5, even if a larger length is requested", async () => {
    const res = await request(app).get(`/api/demo/message?length=10`);
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy;
    expect(res.body.length).toBe(5);
  });

  it("should return an error code if length parameter is missing", async () => {
    const res = await request(app).get(`/api/demo/message`);
    expect(res.statusCode).toEqual(400);
  });

  it("should return an error code if length parameter is negative", async () => {
    const res = await request(app).get(`/api/demo/message?length=-2`);
    expect(res.statusCode).toEqual(400);
  });

  it("should return an error code if length parameter has a wrong type", async () => {
    const res = await request(app).get(`/api/demo/message?length=abc`);
    expect(res.statusCode).toEqual(400);
  });
});
