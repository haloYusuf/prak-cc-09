import express from "express";
import cors from "cors";
import "./model/index.js";
import Route from "./routes/Route.js";
import cookieParser from "cookie-parser";

const app = express();

// CORS Options Configuration
const corsOptions = {
  origin:
    "https://console.cloud.google.com/cloud-build/builds;region=us-central1/c36a3579-e745-4414-b335-6bee5fb42868?inv=1&invt=Abxy3g&project=a-09-450915", // URL frontend kamu (menggunakan Vite, biasanya localhost:5173)
  methods: ["GET", "POST", "PUT", "DELETE"], // Tentukan metode HTTP yang diizinkan
  allowedHeaders: ["Content-Type", "Authorization"], // Tentukan header yang diizinkan
  credentials: true, // Izinkan pengiriman kredensial (cookies)
};

// Menggunakan CORS dengan opsi yang telah didefinisikan
app.use(cors(corsOptions)); // Harus berada di atas route dan middleware lainnya
app.use(express.json()); // Middleware untuk parsing JSON
app.use(cookieParser()); // Middleware untuk parsing cookies
app.use(Route); // Rute API kamu

app.listen(5000, () => console.log("Server Up and Running..."));
