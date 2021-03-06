async function simulateRequest() {
  return new Promise((resolve) =>
    setTimeout(() => {
      console.log("request...");
      resolve();
    }, 100)
  );
}

beforeAll(async () => {
  console.log("before all");
});

afterAll(async () => {
  console.log("after all");
});

test("some test", async () => {
  console.log("before request");
  await simulateRequest();
  console.log("after request");
  expect(true).toBe(true);
});
