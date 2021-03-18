const fastify = require("fastify")({
  logger: { prettyPrint: true },
});

const requiresFoo = {
  properties: { foo: { type: "string" } },
  required: ["foo"],
};

const someUserErrorType1 = { type: "string" };
const someUserErrorType2 = {
  properties: {
    code: { type: "number" },
  },
  required: ["code"],
};

fastify.get(
  "/1",
  {
    schema: {
      query: requiresFoo,
      // Not reponse schema here
    },
  },
  (request, reply) => {
    reply.code(400).send({ isOk: false });
  }
);

fastify.get(
  "/2",
  {
    schema: {
      query: requiresFoo,
      response: { 400: someUserErrorType1 },
    },
  },
  (request, reply) => {
    reply.code(400).send("some error");
  }
);

fastify.get(
  "/3",
  {
    schema: {
      query: requiresFoo,
      response: { 400: someUserErrorType2 },
    },
  },
  (request, reply) => {
    reply.code(400).send({ code: 42 });
  }
);

fastify.listen(8080, function (err) {
  if (err) {
    throw err;
  }
});

/*
curl 'http://127.0.0.1:8080/1?notfoo=string'

curl http://127.0.0.1:8080\?notfoo\=string

curl --request POST --header "Content-Type: application/json" --data '{ "notfoo": "string" }' http://127.0.0.1:8080

curl --request POST --header "Content-Type: application/json" --data '{ "notfoo": "string" }' --cookie session=OkumyBXNIo7TBvvYLDKVPtyNbVsSe2Td.B2o2Jce%2BU7q8my5sCL2w9oS94O42aFMKjqkRG5Wyafo http://127.0.0.1:8080/api/v1/facts/add
*/
