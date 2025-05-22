import Compe from "../model/CompeModel.js";
import Group from "../model/GroupModel.js";
import { uploadToGCS, deleteFromGCS } from "../utils/UploadHelper.js";
import path from "path";
import fs from "fs";

function cleanFilename(id, ext) {
  return `${id.replace(/[^\w\-]/g, "_").toLowerCase()}${ext}`;
}

function generateCompeId() {
  const timestamp = Date.now(); // milidetik sejak 1970
  const randomNum = Math.floor(Math.random() * 1000); // 0-999
  return `compe-${timestamp}-${randomNum}`;
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
    res
      .status(500)
      .json({ message: "Failed to create competition", error: error });
  }
}

export const editCompe = async (req, res) => {
  try {
    const { compeId } = req.params;
    const { compeName, compeDesc, compeDate, maxParticipant } = req.body;

    const compe = await Compe.findByPk(compeId);

    if (!compe)
      return res.status(404).json({ message: "Competition not found" });

    if (compe.compeStatus !== 0) {
      return res.status(400).json({
        message: "Cannot edit competition once it has started or finished",
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
    res
      .status(500)
      .json({ message: "Failed to update competition", error: error });
  }
};

export const updateStatusCompe = async (req, res) => {
  try {
    const { compeId } = req.params;
    const compe = await Compe.findByPk(compeId);

    if (!compe)
      return res.status(404).json({ message: "Competition not found" });

    if (compe.compeStatus === 0) {
      compe.compeStatus = 1;
    } else {
      return res
        .status(400)
        .json({ message: "Competition has already Started" });
    }

    await compe.save();

    res
      .status(200)
      .json({ message: "Competition status updated", data: compe });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to update competition status", error: error });
  }
};

export const deleteCompe = async (req, res) => {
  try {
    const { compeId } = req.params;

    const compe = await Compe.findByPk(compeId);
    if (!compe)
      return res.status(404).json({ message: "Competition not found" });

    if (compe.compeStatus !== 0) {
      return res.status(400).json({
        message: "Competition can only be deleted if status is 0 (Open)",
      });
    }

    if (compe.compeImg) {
      await deleteFromGCS(compe.compeImg);
    }

    await compe.destroy();

    res.status(200).json({ message: "Competition deleted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to delete competition", error: error });
  }
};

export const getAllGroupByCompe = async (req, res) => {
  try {
    const { compeId } = req.params;

    const compe = await Compe.findByPk(compeId);
    if (!compe) {
      return res.status(404).json({ message: "Competition not found" });
    }

    const groups = await Group.findAll({
      where: { compeId },
    });

    res.status(200).json({
      message: `Groups for competition ${compeId}`,
      data: groups,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to fetch groups by competition", error: error });
  }
};

export const approveGroup = async (req, res) => {
  try {
    const { groupId } = req.params; // Mengambil groupId dari parameter URL

    const group = await Group.findByPk(groupId);

    if (!group) {
      return res.status(404).json({ message: "Grup tidak ditemukan." });
    }

    // Idealnya, hanya grup dengan status "Pending" (0) yang bisa disetujui.
    if (group.groupStatus === 1) {
      return res.status(400).json({ message: "Grup ini sudah disetujui." });
    }
    if (group.groupStatus === -1) {
      return res.status(400).json({
        message:
          "Grup ini sudah ditolak. Tidak bisa disetujui langsung, mungkin perlu proses pengajuan ulang.",
      });
    }
    // Jika groupStatus bukan 0 (Pending)
    if (group.groupStatus !== 0) {
      return res.status(400).json({
        message: `Grup tidak dalam status Pending. Status saat ini: ${group.groupStatus}`,
      });
    }

    group.groupStatus = 1; // 1 => Accepted (Disetujui)
    group.rejectedMessage = null; // Kosongkan pesan penolakan jika ada
    await group.save();

    // Opsional: Kirim notifikasi ke leader grup atau emit event WebSocket
    // const leader = await User.findByPk(group.uid);
    // if (leader) { /* kirim notifikasi */ }
    // const io = getIoInstance(); // Jika menggunakan WebSocket
    // io.to(`compe-${group.compeId}`).emit('groupStatusUpdated', { groupId: group.groupId, status: group.groupStatus, compeId: group.compeId });
    // io.to(`user-${group.uid}`).emit('yourGroupApproved', { groupName: group.groupName, compeId: group.compeId });

    res.status(200).json({
      message: "Grup berhasil disetujui.",
      data: group,
    });
  } catch (error) {
    console.error("Error saat menyetujui grup:", error);
    res
      .status(500)
      .json({ message: "Gagal menyetujui grup.", error: error.message });
  }
};

export const rejectGroup = async (req, res) => {
  try {
    const { groupId } = req.params; // Mengambil groupId dari parameter URL
    const { rejectedMessage } = req.body; // Mengambil alasan penolakan dari body request

    if (!rejectedMessage || rejectedMessage.trim() === "") {
      return res
        .status(400)
        .json({ message: "Alasan penolakan (rejectedMessage) harus diisi." });
    }

    const group = await Group.findByPk(groupId);

    if (!group) {
      return res.status(404).json({ message: "Grup tidak ditemukan." });
    }

    // Idealnya, hanya grup dengan status "Pending" (0) yang bisa ditolak.
    // Namun, admin mungkin bisa menolak grup yang sudah "Accepted" (1) jika ada kasus khusus,
    // tapi untuk kasus umum, kita fokus pada penolakan grup yang "Pending".
    if (group.groupStatus === -1) {
      return res
        .status(400)
        .json({ message: "Grup ini sudah ditolak sebelumnya." });
    }
    // Jika groupStatus bukan 0 (Pending)
    if (group.groupStatus !== 0) {
      // Anda bisa memutuskan apakah admin boleh menolak grup yang sudah 'Accepted' (1)
      // Jika tidak, tambahkan pengecekan: if (group.groupStatus === 1) return res.status(400).json(...)
      console.warn(
        `Peringatan: Menolak grup yang tidak dalam status Pending. Status saat ini: ${group.groupStatus}, Grup ID: ${groupId}`
      );
    }

    group.groupStatus = -1; // -1 => Rejected (Ditolak)
    group.rejectedMessage = rejectedMessage;
    await group.save();

    // Opsional: Kirim notifikasi ke leader grup atau emit event WebSocket
    // const leader = await User.findByPk(group.uid);
    // if (leader) { /* kirim notifikasi */ }
    // const io = getIoInstance(); // Jika menggunakan WebSocket
    // io.to(`compe-${group.compeId}`).emit('groupStatusUpdated', { groupId: group.groupId, status: group.groupStatus, rejectedMessage: group.rejectedMessage, compeId: group.compeId });
    // io.to(`user-${group.uid}`).emit('yourGroupRejected', { groupName: group.groupName, rejectedMessage: group.rejectedMessage, compeId: group.compeId });

    res.status(200).json({
      message: "Grup berhasil ditolak.",
      data: group,
    });
  } catch (error) {
    console.error("Error saat menolak grup:", error);
    res
      .status(500)
      .json({ message: "Gagal menolak grup.", error: error.message });
  }
};
