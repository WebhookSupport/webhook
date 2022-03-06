/**
 * Express server file that consists the routes
 */
import { webhook } from "./webhook/gitHub";

const express = require("express");

const app = express();
const PORT = 3030;

app.get("/", (req: any, res: any) => {
  console.log(req + res);
  return res.send("GET HTTP method");
});

app.post("/", (req: any, res: any) => {
  let body = "";
  req.on("readable", () => {
    body += req.read();
  });
  req.on("end", async () => {
    return res.send(await webhook(body.slice(0, -4).trim(), res));
  });
});

app.put("/", (req: any, res: any) => {
  console.log(req + res);
  return res.send("PUT HTTP method");
});

app.delete("/", (req: any, res: any) => {
  console.log(req + res);
  return res.send("DELETE HTTP method");
});

app.listen(PORT, () => console.log(`app listening on port ${PORT}!`));
