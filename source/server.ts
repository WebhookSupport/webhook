import { webhook } from "./applicationLogic/gitHubHelper";

/** source/server.ts */
const express = require("express");

const app = express();
const PORT = 8080;

app.get("/", (req: any, res: any) => {
  console.log(req + res);
  return res.send("Received a GET HTTP method");
});

app.post("/", async (req: any, res: any) => {
  return await webhook(req, res);
});

app.put("/", (req: any, res: any) => {
  console.log(req + res);
  return res.send("Received a PUT HTTP method");
});

app.delete("/", (req: any, res: any) => {
  console.log(req + res);
  return res.send("Received a DELETE HTTP method");
});

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
