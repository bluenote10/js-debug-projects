const fastify = require("fastify")({
  logger: true,
});

const schemaFoo = {
  properties: {
    foo: { type: "string" },
    baz: { type: "string" },
  },
};

const schemaBar = {
  properties: {
    bar: { type: "string" },
    baz: { type: "string" },
  },
};

const opts = {
  schema: {
    response: {
      200: {
        type: "object",
        anyOf: [schemaFoo, schemaBar],
      },
    },
  },
};

fastify.get("/foo", opts, (request, reply) => {
  reply.send({ foo: "foo", baz: "baz" });
});

fastify.get("/bar", opts, (request, reply) => {
  reply.send({ bar: "bar", baz: "baz" });
});

fastify.get("/wrong", opts, (request, reply) => {
  reply.send({ foo: "foo", bar: "bar" });
});

fastify.listen(8080, function (err) {
  if (err) {
    throw err;
  }
});
