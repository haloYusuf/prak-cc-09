import express from "express";
import cors from "cors";
import "./model/index.js";
import Route from "./routes/Route.js";
import cookieParser from "cookie-parser";

const app = express();

const port = process.env.PORT || 5000;

// CORS Options Configuration
const corsOptions = {
  origin: "https://frontend-yusuf-6-dot-a-09-450915.uc.r.appspot.com", // URL frontend kamu (menggunakan Vite, biasanya localhost:5173)
  methods: ["GET", "POST", "PUT", "DELETE"], // Tentukan metode HTTP yang diizinkan
  allowedHeaders: ["Content-Type", "Authorization"], // Tentukan header yang diizinkan
  credentials: true, // Izinkan pengiriman kredensial (cookies)
};

// Menggunakan CORS dengan opsi yang telah didefinisikan
app.use(cors(corsOptions)); // Harus berada di atas route dan middleware lainnya
app.use(express.json()); // Middleware untuk parsing JSON
app.use(cookieParser()); // Middleware untuk parsing cookies
app.use(Route); // Rute API kamu

app.listen(port, () => console.log("Server Up and Running..."));
