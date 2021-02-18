const logger = require("pino")();

async function simulateRequest() {
  return new Promise((resolve) =>
    setTimeout(() => {
      logger.info("request...");
      resolve();
    }, 100)
  );
}

describe("SomeThing", () => {
  beforeAll(async () => {
    logger.info("before all");
  });

  afterAll(async () => {
    logger.info("after all");
  });

  it("should do 1", async () => {
    logger.info("before request");
    console.log("before request");
    await simulateRequest();
    logger.info("after request");
    console.log("after request");
    expect(true).toBe(true);
  });

  it("should do 2", async () => {
    logger.info("before request");
    console.log("before request");
    await simulateRequest();
    logger.info("after request");
    console.log("after request");
    expect(true).toBe(true);
  });

  it("should do 3", async () => {
    logger.info("before request");
    console.log("before request");
    await simulateRequest();
    logger.info("after request");
    console.log("after request");
    expect(true).toBe(true);
  });

  it("should do 4", async () => {
    logger.info("before request");
    console.log("before request");
    await simulateRequest();
    logger.info("after request");
    console.log("after request");
    expect(true).toBe(true);
  });

  it("should do 5", async () => {
    logger.info("before request");
    console.log("before request");
    await simulateRequest();
    logger.info("after request");
    console.log("after request");
    expect(true).toBe(true);
  });

  it("should do 6", async () => {
    logger.info("before request");
    console.log("before request");
    await simulateRequest();
    logger.info("after request");
    console.log("after request");
    expect(true).toBe(true);
  });

  it("should do 7", async () => {
    logger.info("before request");
    console.log("before request");
    await simulateRequest();
    logger.info("after request");
    console.log("after request");
    expect(true).toBe(true);
  });
});
