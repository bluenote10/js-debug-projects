/*
Most basic example.

References:
- https://stackoverflow.com/questions/55162619/why-do-i-lose-stack-trace-when-using-async-await-in-node-js
- https://thecodebarbarian.com/async-stack-traces-in-node-js-12
- https://github.com/nodejs/node/issues/36126
*/

run().then(
  () => console.log("success"),
  (error) => console.error(error.stack)
);

async function run() {
  await new Promise((resolve) => setTimeout(resolve, 10));
  await bar();
}

async function bar() {
  await Promise.resolve();
  // Stack trace will just include `bar()`, no reference to `run()`
  throw new Error("Oops");
}
