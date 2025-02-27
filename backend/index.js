import express from "express";
import cors from "cors";
import Route from "./routes/Route.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(Route);

app.listen(5000, () => console.log("Server Up and Running..."));
