import { bucket } from "../config/gcs.js";
import fs from "fs/promises";

// Upload dari path lokal
export async function uploadToGCS(
  localPath,
  destination,
  mimetype = "application/octet-stream"
) {
  const options = {
    destination,
    public: true,
    metadata: {
      contentType: mimetype,
      cacheControl: "public, max-age=31536000",
    },
  };

  await bucket.upload(localPath, options);

  // Hapus file lokal setelah upload
  await fs.unlink(localPath);

  return `https://storage.googleapis.com/${bucket.name}/${destination}`;
}

export async function deleteFromGCS(fileUrlOrPath) {
  try {
    let filePath;

    // Jika URL, ambil hanya path-nya setelah nama bucket
    if (fileUrlOrPath.startsWith("http")) {
      const url = new URL(fileUrlOrPath);
      // contoh path: /compe-app-1/competition/xxx.png
      const pathParts = url.pathname.split("/");
      // ambil semua setelah /[bucket-name]/... menjadi path dalam bucket
      const bucketIndex = pathParts.indexOf(bucket.name);
      filePath = pathParts.slice(bucketIndex + 1).join("/");
    } else {
      // Sudah path langsung (misal 'competition/xxx.png')
      filePath = fileUrlOrPath;
    }

    await bucket.file(filePath).delete();
    console.log(`✅ File ${filePath} berhasil dihapus dari GCS`);
  } catch (err) {
    if (err.code === 404) {
      console.warn("⚠️ File tidak ditemukan di GCS:", err.message);
    } else {
      console.warn("⚠️ Gagal menghapus file dari GCS:", err.message);
    }
  }
}
