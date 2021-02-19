const fastify = require("fastify")({
  logger: true,
});

const opts = {
  schema: {
    querystring: {
      type: "object",
      properties: {
        ids: {
          type: "array",
          items: { type: "string" },
        },
      },
      required: ["ids"],
    },
  },
};

fastify.get("/", opts, (request, reply) => {
  fastify.log.info(request.query);
  reply.send({ ok: true });
});

fastify.listen(8080, function (err) {
  if (err) {
    throw err;
  }
});
