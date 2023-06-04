import request from "supertest";
import app from "../../app";

describe("Error handling tests", () => {
  test("returns 404 when given a nonexistent route", async () => {
    const response = await request(app).get("/some-route");
    expect(response.status).toBe(404);
    expect(response.text).toBe("Not Found");
  });

  xtest("returns 500 when an unspecified error occurs", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(500);
    expect(response.text).toBe("some error");
  });
});
