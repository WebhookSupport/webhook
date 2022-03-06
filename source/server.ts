import { webhook } from "./applicationLogic/gitHubHelper";

const express = require("express");

const app = express();
const PORT = 3030;

app.get("/", (req: any, res: any) => {
  console.log(req + res);
  return res.send("Received a GET HTTP method");
});

app.post("/", (req: any, res: any) => {
  let body = "";
  req.on("readable", () => {
    body += req.read();
  });
  req.on("end", async () => {
    console.log(body);
    return res.send(await webhook(body, res));
  });
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
