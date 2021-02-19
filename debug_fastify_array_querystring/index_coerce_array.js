const fastify = require("fastify")();

const Ajv = require("ajv").default;

const ajv = new Ajv({
  removeAdditional: true,
  useDefaults: true,
  coerceTypes: "array",
  allErrors: true,
});

fastify.setValidatorCompiler(({ schema, method, url, httpPart }) => {
  return ajv.compile(schema);
});

const opts = {
  schema: {
    querystring: {
      type: "object",
      properties: {
        hello: {
          type: "array",
          default: [],
        },
      },
    },
  },
};

fastify.get("/", opts, (request, reply) => {
  reply.send({ params: request.query });
});

fastify.listen(3535, function (err) {
  if (err) {
    throw err;
  }
  console.log(`server listening on ${fastify.server.address().port}`);
});
