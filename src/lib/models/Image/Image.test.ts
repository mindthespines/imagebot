import Image from "./Image";
import pool from "../../database/pool";
import setup from "../../database/setup-db";

describe("Image model tests", () => {
  beforeEach(async () => {
    await setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it("creates a new image record", async () => {
    const actual = await Image.create({ url: "http://not-a-real.url" });
    expect(actual).toEqual({ id: expect.any(String) });
  });
});
