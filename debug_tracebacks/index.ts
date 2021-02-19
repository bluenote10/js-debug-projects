import express from "express";

import { Client } from "pg";

function runApp() {
  const app = express();
  const port = 3000;

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
}

function provokeExceptionExpress() {
  runApp();
  runApp();
}

async function provokeExceptionPg() {
  let client = new Client();
  await client.connect();
}

provokeExceptionPg().catch((err) => console.log(err));
