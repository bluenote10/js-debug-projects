const fastJson = require("fast-json-stringify");

const schemaFoo = {
  properties: {
    foo: { type: "string" },
    baz: { type: "string" },
  },
  required: ["foo", "baz"],
};

const schemaBar = {
  properties: {
    bar: { type: "string" },
    baz: { type: "string" },
  },
  required: ["bar", "baz"],
};

const stringify = fastJson({
  type: "object",
  anyOf: [schemaFoo, schemaBar],
});

console.log(stringify({ foo: "foo", baz: "baz" }));
console.log(stringify({ bar: "foo", baz: "baz" }));
