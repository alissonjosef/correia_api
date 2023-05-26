import * as dotenv from "dotenv";
import express from "express";
import { main } from "./db/conn";
const cors = require("cors");
dotenv.config();

const externalIP = process.env.RENDER_EXTERNAL_IP;
console.log("oiii", externalIP);

const app = express();
const port = 3333;
app.use(cors());

app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

main();

const routes = require("./routes/router");

app.use("/api", routes);

app.get("/", (req, res) => {
  res.send("Ola");
});

app.listen(port, () => {
  console.log(`🚀 Servidor rodando na porta http://localhost:${port}`);
});
