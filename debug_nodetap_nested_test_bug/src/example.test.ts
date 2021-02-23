import t from "tap";
import supertest from "supertest";
import fastify from "fastify";

async function buildApp() {
  const app = fastify({ logger: true });
  app.get("/", function (request, reply) {
    reply.send({ hello: "world" });
  });
  await app.ready();
  return app;
}

t.test("Endpoint test (1)", async () => {
  const app = await buildApp();

  // Executed directly: Works
  const response = await supertest(app.server).get("/").expect(200);
  t.equals(response.status, 200);

  app.close();
});

t.test("Endpoint test (2)", async () => {
  const app = await buildApp();

  const wrapped = async () => {
    // Executed within wrapper: Works
    const response = await supertest(app.server).get("/").expect(200);
    t.equals(response.status, 200);
  };
  await wrapped();

  app.close();
});

t.test("Endpoint test (3)", async () => {
  const app = await buildApp();

  t.test("sub test", async () => {
    // Executed within t.test: Fails
    const response = await supertest(app.server).get("/").expect(200);
    t.equals(response.status, 200);
  });

  app.close();
});
