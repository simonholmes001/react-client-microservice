const amqp = require("amqplib/callback_api");
const amqpURL = "amqps://meaningless_URL";

const publisher = require("../publisher");

const filename = "testOne";
const result = "testTwo";

describe("publisher", () => {
  it("Should return the correct filename", async (publisher) => {
    expect(filename).toEqual("testOne")
  });

  it("Should return the correct filename", async (publisher) => {
    expect(result).toEqual("testTwo")
  });
});
