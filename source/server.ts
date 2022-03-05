/** source/server.ts */
const express = require("express");

const app = express();
const PORT = 3030;

app.get("/", (req: any, res: { send: (arg0: string) => any }) => {
  console.log(req + res);
  return res.send("Received a GET HTTP method");
});

app.post("/", (req: any, res: { send: (arg0: string) => any }) => {
  console.log(req + res);
  return res.send("Received a POST HTTP method");
});

app.put("/", (req: any, res: { send: (arg0: string) => any }) => {
  console.log(req + res);
  return res.send("Received a PUT HTTP method");
});

app.delete("/", (req: any, res: { send: (arg0: string) => any }) => {
  console.log(req + res);
  return res.send("Received a DELETE HTTP method");
});

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
