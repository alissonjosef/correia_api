import * as dotenv from "dotenv";
import express from "express";
import { main } from "./db/conn";
dotenv.config();

const app = express();
const port = 3333;

app.use(express.json());

main();

const routes = require("./routes/router");

app.use("/api", routes);

app.get("/", (req, res) => {
  res.send("Ola");
});

app.listen(port, () => {
  console.log(`🚀 Servidor rodando na porta http://localhost:${port}`);
});
