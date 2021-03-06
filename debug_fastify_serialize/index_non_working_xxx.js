const fastify = require("fastify")({
  logger: true,
});

const opts = {
  schema: {
    response: {
      xxx: {
        type: "object",
        properties: {
          foo: { type: "number" },
        },
      },
    },
  },
};

fastify.get("/", opts, (request, reply) => {
  fastify.log.info(request.query);
  reply.send({ foo: "baz" });
});

fastify.listen(8080, function (err) {
  if (err) {
    throw err;
  }
});
