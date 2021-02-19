const pg = require("pg");

async function provokeExceptionPg() {
  let client = new pg.ClientNonexisting();
  await client.connect();
}

provokeExceptionPg().catch((err) => console.log(err));
