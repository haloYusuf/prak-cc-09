import Group from "../model/GroupModel.js";
import Compe from "../model/CompeModel.js";
import GroupMember from "../model/GroupMemberModel.js";
import crypto from "crypto";
import path from "path";
import fs from "fs";
import { uploadToGCS, deleteFromGCS } from "../utils/UploadHelper.js";

function cleanFilename(id, ext) {
  return `${id.replace(/[^\w\-]/g, "_").toLowerCase()}${ext}`;
}

export function generateGroupId() {
  const timestamp = Date.now(); // waktu dalam milidetik
  const randomHex = crypto.randomBytes(4).toString("hex"); // 8 karakter hex
  return `group-${timestamp}-${randomHex}`;
}

export async function createGroup(req, res) {
  try {
    const { compeId, leaderId, groupName, maxMember } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "Image file is required" });
    }

    const existingGroup = await Group.findOne({
      where: {
        compeId,
        uid: leaderId,
      },
    });
    if (existingGroup) {
      return res.status(400).json({
        message: "User already has a group in this competition",
        error: "User already has a group in this competition",
      });
    }

    const competition = await Compe.findByPk(compeId);
    if (!competition) {
      if (fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(404).json({ message: "Kompetisi tidak ditemukan." });
    }

    const approvedGroupsCount = await Group.count({
      where: {
        compeId: compeId,
        groupStatus: 1, // 1 => Accepted
      },
    });

    if (approvedGroupsCount >= competition.maxParticipant) {
      if (fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(400).json({
        message: `Batas maksimum grup (${competition.maxParticipant}) untuk kompetisi ini telah tercapai. Tidak dapat membuat grup baru.`,
      });
    }

    const groupId = generateGroupId();
    const ext = path.extname(req.file.originalname);
    const filename = cleanFilename(groupId, ext);
    const gcsPath = `group/${filename}`;

    // Upload ke GCS
    const publicUrl = await uploadToGCS(req.file.path, gcsPath);

    // Hapus file lokal setelah upload
    if (fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    // Simpan ke DB
    const newGroup = await Group.create({
      groupId,
      compeId,
      uid: leaderId,
      groupName,
      groupImg: publicUrl,
      maxMember,
    });

    try {
      await GroupMember.create({
        uid: newGroup.uid,
        groupId: newGroup.groupId,
      });
      console.log(
        `Leader ${newGroup.uid} berhasil ditambahkan sebagai anggota ke grup ${newGroup.groupId}`
      );
    } catch (memberError) {
      console.error(
        `Gagal menambahkan leader ${newGroup.uid} ke GroupMember untuk grup ${newGroup.groupId}:`,
        memberError
      );
      return res.status(500).json({
        message: "Grup dibuat, tapi gagal menambahkan leader sebagai anggota.",
        error: memberError.message,
      });
    }

    res.status(201).json({
      message: "Group created successfully",
      data: newGroup,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create group", error: error });
  }
}

export const editGroup = async (req, res) => {
  try {
    const { groupId } = req.params;
    const { groupName, maxMember } = req.body;
    console.log("req.user in controller:", req.user);
    const userId = req.user.id; // Diambil dari middleware verifyToken

    const group = await Group.findByPk(groupId);

    if (!group) {
      // Jika ada file terupload karena validasi gagal, hapus file sementara
      if (req.file && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(404).json({ message: "Grup tidak ditemukan." });
    }

    // Periksa apakah pengguna adalah leader grup
    if (group.uid !== userId) {
      if (req.file && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
      return res
        .status(403)
        .json({ message: `Forbidden: Anda bukan leader grup ini ${userId}` });
    }

    // Periksa apakah status grup adalah 0 (Pending)
    if (group.groupStatus !== 0) {
      if (req.file && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(400).json({
        message: `Grup tidak bisa diedit. Status saat ini: ${
          group.groupStatus === 1 ? "Disetujui" : "Ditolak"
        }. Hanya grup dengan status Pending yang bisa diedit.`,
      });
    }

    let newGroupImgUrl = group.groupImg;

    // Logika untuk update gambar jika ada file baru diupload
    if (req.file) {
      const ext = path.extname(req.file.originalname);
      const cleanName = cleanFilename(groupId, ext);
      const localPath = req.file.path;
      const destination = `group/${cleanName}`;

      // (Opsional) Hapus gambar lama dari GCS
      await deleteFromGCS(group.groupImg);

      // Upload file ke GCS
      newGroupImgUrl = await uploadToGCS(localPath, destination);

      // Hapus file lokal
      if (fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
    }

    // Update field yang diizinkan
    if (groupName) group.groupName = groupName;
    if (maxMember) group.maxMember = parseInt(maxMember, 10); // Pastikan maxMember adalah integer
    group.groupImg = newGroupImgUrl; // Update URL gambar

    await group.save();

    res.status(200).json({
      message: "Grup berhasil diperbarui.",
      data: group,
    });
  } catch (error) {
    console.error("Error saat mengedit grup:", error);
    // Hapus file lokal jika ada error dan file terupload
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    res
      .status(500)
      .json({ message: "Gagal mengedit grup.", error: error.message });
  }
};

export const deleteGroup = async (req, res) => {
  try {
    const { groupId } = req.params;
    const userId = req.user.id; // Diambil dari middleware verifyToken

    const group = await Group.findByPk(groupId);

    if (!group) {
      return res.status(404).json({ message: "Grup tidak ditemukan." });
    }

    // Periksa apakah pengguna adalah leader grup
    if (group.uid !== userId) {
      return res
        .status(403)
        .json({ message: "Forbidden: Anda bukan leader grup ini." });
    }

    // Periksa status grup: hanya bisa dihapus jika -1 (Rejected) atau 0 (Pending)
    if (group.groupStatus !== -1 && group.groupStatus !== 0) {
      let statusMessage = "Disetujui"; // Default untuk status yang tidak diizinkan (selain -1 atau 0)
      if (group.groupStatus === 1) statusMessage = "Disetujui";
      else statusMessage = `dengan status tidak dikenal (${group.groupStatus})`;

      return res.status(400).json({
        message: `Grup dengan status ${statusMessage} tidak dapat dihapus. Hanya grup yang Ditolak atau Pending yang bisa dihapus oleh leader.`,
      });
    }

    // Hapus gambar dari GCS jika ada
    if (group.groupImg) {
      await deleteFromGCS(group.groupImg);
    }

    try {
      const deletedMembersCount = await GroupMember.destroy({
        where: { groupId: groupId },
      });
      console.log(
        `${deletedMembersCount} anggota grup berhasil dihapus untuk grup ID: ${groupId}`
      );
    } catch (memberError) {
      console.error(
        `Gagal menghapus anggota grup untuk grup ID: ${groupId}`,
        memberError
      );
    }

    // Hapus grup dari database
    await group.destroy();

    res.status(200).json({ message: "Grup berhasil dihapus." });
  } catch (error) {
    console.error("Error saat menghapus grup:", error);
    res
      .status(500)
      .json({ message: "Gagal menghapus grup.", error: error.message });
  }
};

export const getAllGroupMembers = async (req, res) => {
  try {
    const { groupId } = req.params;

    const group = await Group.findByPk(groupId, {
      include: [
        {
          model: User,
          as: "Leader",
          attributes: ["uid", "userName", "email"],
        },
      ],
    });
    if (!group) {
      return res.status(404).json({ message: "Grup tidak ditemukan." });
    }

    const members = await GroupMember.findAll({
      where: { groupId: groupId },
      include: [
        {
          model: User,
          attributes: ["uid", "userName", "email", "phoneNumber", "role"],
        },
      ],
    });
    let memberList = [];
    if (members && members.length > 0) {
      memberList = members.map((member) => member.User);
    }

    res.status(200).json({
      message: `Anggota untuk grup ${group.groupName} (ID: ${groupId})`,
      groupDetails: {
        groupId: group.groupId,
        groupName: group.groupName,
        groupImg: group.groupImg,
        maxMember: group.maxMember,
        groupStatus: group.groupStatus,
        leader: group.Leader,
      },
      members: memberList,
      totalMembersInTable: members.length,
    });
  } catch (error) {
    console.error("Error saat mengambil anggota grup:", error);
    res
      .status(500)
      .json({ message: "Gagal mengambil anggota grup.", error: error.message });
  }
};
