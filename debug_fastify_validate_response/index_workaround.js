const fastify = require("fastify")({
  logger: { prettyPrint: true },
});

fastify.get(
  "/",
  {
    schema: {
      query: {
        properties: { foo: { type: "string" } },
        required: ["foo"],
      },
      response: {
        200: {
          properties: { isOk: { type: "boolean" } },
          required: ["isOk"],
        },
        400: {
          properties: { isOk: { type: "boolean" } },
          required: ["isOk"],
        },
      },
    },
  },
  (request, reply) => {
    if (Math.random() < 0.5) {
      reply.send({ isOk: true });
    } else {
      reply.code(400).send({ isOk: false });
    }
  }
);

fastify.setErrorHandler(function (error, request, reply) {
  console.log(error);
  if (error.validation) {
    reply.status(400).send({ isOk: false });
  }
});

fastify.listen(8080, function (err) {
  if (err) {
    throw err;
  }
});

/*
curl http://127.0.0.1:8080\?notfoo\=string

curl --request POST --header "Content-Type: application/json" --data '{ "notfoo": "string" }' http://127.0.0.1:8080

curl --request POST --header "Content-Type: application/json" --data '{ "notfoo": "string" }' --cookie session=OkumyBXNIo7TBvvYLDKVPtyNbVsSe2Td.B2o2Jce%2BU7q8my5sCL2w9oS94O42aFMKjqkRG5Wyafo http://127.0.0.1:8080/api/v1/facts/add
*/
