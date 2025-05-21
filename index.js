import express from "express";
import cors from "cors";
import "./model/model.js";
import compeRouter from "./routes/CompeRoute.js";
import cookieParser from "cookie-parser";

const app = express();

const port = process.env.PORT || 5000;

// CORS Options Configuration
const corsOptions = {
  origin: ["localhost:5173"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions)); // Harus berada di atas route dan middleware lainnya
app.use(express.json()); // Middleware untuk parsing JSON
app.use(cookieParser()); // Middleware untuk parsing cookies
app.use('/compe', compeRouter); // Rute API kamu

app.listen(port, () => console.log("Server Up and Running..."));