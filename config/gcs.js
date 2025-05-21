import { Storage } from "@google-cloud/storage";
import path from "path";
import { fileURLToPath } from "url";

// Penyesuaian untuk __dirname di ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Inisialisasi Storage client
const storage = new Storage({
  keyFilename: path.join(__dirname, "service-account.json"),
});

const bucketName = "compe-app-1"; // Ganti dengan nama bucket kamu
const bucket = storage.bucket(bucketName);

export { storage, bucket };
