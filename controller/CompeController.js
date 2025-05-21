import Compe from "../model/CompeModel.js";
import { uploadToGCS, deleteFromGCS } from "../utils/UploadHelper.js";
import path from "path";
import fs from "fs";

function cleanFilename(id, ext) {
  return `${id.replace(/[^\w\-]/g, "_").toLowerCase()}${ext}`;
}

function generateCompeId() {
  const timestamp = Date.now(); // milidetik sejak 1970
  const randomNum = Math.floor(Math.random() * 1000); // 0-999
  return `COMPE-${timestamp}-${randomNum}`;
}

export const getAllCompe = async (req, res) => {
  try {
    const response = await Compe.findAll();
    if (response.length === 0) {
      return res.status(404).json({
        message: "Tidak ditemukan data lomba!",
      });
    }

    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "Terjadi kesalahan saat mengambil data lomba",
      error: error.message,
    });
  }
};

export const getCompeById = async (req, res) => {
  try {
    const response = await Compe.findOne({
      where: { compeId: req.params.compeId },
    });
    if (response.length === 0) {
      return res.status(404).json({
        message: "Data lomba yang dipilih tidak ditemukan.",
      });
    }

    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "Terjadi kesalahan saat mengambil data lomba.",
      error: error.message,
    });
  }
};

export async function createCompe(req, res) {
  try {
    const { compeName, compeDesc, compeDate, compeStatus, maxParticipant } =
      req.body;

    if (!req.file) {
      return res.status(400).json({ error: "Image file is required" });
    }
    const compeId = generateCompeId();
    const ext = path.extname(req.file.originalname);
    const filename = cleanFilename(compeId, ext);
    const gcsPath = `competition/${filename}`;

    // Upload ke GCS
    const publicUrl = await uploadToGCS(req.file.path, gcsPath);

    // Hapus file lokal setelah upload
    if (fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    // Simpan ke DB
    const newCompe = await Compe.create({
      compeId,
      compeName,
      compeDesc,
      compeDate,
      compeStatus: compeStatus || 0,
      maxParticipant,
      compeImg: publicUrl,
    });

    res.status(201).json({
      message: "Competition created successfully",
      data: newCompe,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create competition" });
  }
}

export const editCompe = async (req, res) => {
  try {
    const { compeId } = req.params;
    const { compeName, compeDesc, compeDate, maxParticipant } = req.body;

    const compe = await Compe.findByPk(compeId);

    if (!compe) return res.status(404).json({ error: "Competition not found" });

    if (compe.compeStatus !== 0) {
      return res.status(400).json({
        error: "Cannot edit competition once it has started or finished",
      });
    }

    let newImgUrl = compe.compeImg;

    // Jika ada file baru, upload ke GCS
    if (req.file) {
      const ext = path.extname(req.file.originalname);
      const cleanName = cleanFilename(compeId, ext);
      const localPath = req.file.path;
      const destination = `competition/${cleanName}`;

      // (Opsional) Hapus gambar lama dari GCS
      await deleteFromGCS(compe.compeImg);

      // Upload file ke GCS
      newImgUrl = await uploadToGCS(localPath, destination);

      // Hapus file lokal
      if (fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
    }

    compe.compeName = compeName || compe.compeName;
    compe.compeDesc = compeDesc || compe.compeDesc;
    compe.compeDate = compeDate || compe.compeDate;
    compe.maxParticipant = maxParticipant || compe.maxParticipant;

    await compe.save();

    res
      .status(200)
      .json({ message: "Competition updated successfully", data: compe });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update competition" });
  }
};

export const updateStatusCompe = async (req, res) => {
  try {
    const { compeId } = req.params;
    const compe = await Compe.findByPk(compeId);

    if (!compe) return res.status(404).json({ error: "Competition not found" });

    if (compe.compeStatus === 0) {
      compe.compeStatus = 1;
    } else if (compe.compeStatus === 1) {
      compe.compeStatus = 2;
    } else {
      return res
        .status(400)
        .json({ error: "Competition has already finished" });
    }

    await compe.save();

    res
      .status(200)
      .json({ message: "Competition status updated", data: compe });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update competition status" });
  }
};

export const deleteCompe = async (req, res) => {
  try {
    const { compeId } = req.params;

    const compe = await Compe.findByPk(compeId);
    if (!compe) return res.status(404).json({ error: "Competition not found" });

    if (compe.compeStatus !== 0) {
      return res.status(400).json({
        error: "Competition can only be deleted if status is 0 (Open)",
      });
    }

    if (compe.compeImg) {
      await deleteFromGCS(compe.compeImg);
    }

    await compe.destroy();

    res.status(200).json({ message: "Competition deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete competition" });
  }
};
