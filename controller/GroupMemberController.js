import GroupMember from "../model/GroupMemberModel.js";
import Group from "../model/GroupModel.js";
import User from "../model/UserModel.js";
import { Sequelize } from "sequelize"; // Untuk transaksi jika diperlukan dan Op

export const createNewMember = async (req, res) => {
  const leaderUid = req.user.uid; // Diambil dari middleware verifyToken

  const { groupId } = req.params; // atau req.body.groupId
  const { uid } = req.body; // UID pengguna yang akan ditambahkan

  if (!uid) {
    return res.status(400).json({
      message: "UID anggota yang akan ditambahkan (uid) diperlukan.",
    });
  }

  if (leaderUid === uid) {
    return res.status(400).json({
      message:
        "Anda tidak dapat menambahkan diri sendiri sebagai anggota lagi.",
    });
  }

  try {
    const group = await Group.findByPk(groupId);
    if (!group) {
      return res.status(404).json({ message: "Grup tidak ditemukan." });
    }

    // if (group.uid !== leaderUid) {
    //   return res.status(403).json({
    //     message:
    //       "Forbidden: Hanya leader grup yang dapat menambahkan anggota baru.",
    //   });
    // }

    if (group.groupStatus !== 1) {
      let statusMessage = "Pending";
      if (group.groupStatus === -1) statusMessage = "Ditolak";
      else if (group.groupStatus === 0) statusMessage = "Pending";
      else statusMessage = `dengan status tidak dikenal (${group.groupStatus})`;
      return res.status(400).json({
        message: `Tidak dapat menambahkan anggota. Grup saat ini berstatus: ${statusMessage}. Hanya grup yang Disetujui yang bisa ditambahkan anggota.`,
      });
    }

    const memberExists = await User.findByPk(uid);
    if (!memberExists) {
      return res.status(404).json({
        message: `Pengguna dengan UID ${uid} yang akan ditambahkan tidak ditemukan.`,
      });
    }

    const targetCompeId = group.compeId;
    const otherGroupInSameCompe = await GroupMember.findOne({
      where: {
        uid: uid,
      },
      include: [
        {
          model: Group,
          attributes: ["groupId", "groupName", "compeId"],
          where: {
            compeId: targetCompeId,
            groupId: { [Sequelize.Op.ne]: groupId },
          },
          required: true,
        },
      ],
    });

    if (otherGroupInSameCompe) {
      return res.status(400).json({
        message: `Pengguna dengan UID ${uid} sudah terdaftar di grup lain (Nama Grup: "${otherGroupInSameCompe.Group.groupName}") dalam kompetisi ini.`,
      });
    }

    // 5. Hitung jumlah anggota saat ini dalam grup
    const currentMemberCount = await GroupMember.count({
      where: { groupId: groupId },
    });

    // 6. Periksa apakah grup sudah penuh (jumlah anggota saat ini + leader)
    if (currentMemberCount + 1 >= group.maxMember) {
      return res.status(400).json({
        message: `Grup sudah penuh. Jumlah anggota saat ini (${
          currentMemberCount + 1
        }) telah mencapai batas maksimum (${group.maxMember}).`,
      });
    }

    // 7. Periksa apakah pengguna sudah menjadi anggota grup tersebut
    const isAlreadyMember = await GroupMember.findOne({
      where: {
        groupId: groupId,
        uid: uid,
      },
    });

    if (isAlreadyMember) {
      return res.status(400).json({
        message: `Pengguna dengan UID ${uid} sudah menjadi anggota grup ini.`,
      });
    }

    // 8. Jika semua validasi lolos, buat entri baru di GroupMember
    const newMemberEntry = await GroupMember.create({
      uid: uid,
      groupId: groupId,
    });

    res.status(201).json({
      message: `Pengguna dengan UID ${uid} berhasil ditambahkan ke grup ${group.groupName}.`,
      data: newMemberEntry,
    });
  } catch (error) {
    console.error("Error saat menambahkan anggota baru ke grup:", error);
    res.status(500).json({
      message: "Gagal menambahkan anggota baru ke grup.",
      error: error.message,
    });
  }
};

export const removeMemberFromGroup = async (req, res) => {
  const userUid = req.user.uid;
  const { groupId } = req.params;

  try {
    const group = await Group.findByPk(groupId);
    if (!group) {
      return res.status(404).json({ message: "Grup tidak ditemukan." });
    }

    if (group.uid === userUid) {
      return res.status(400).json({
        message:
          "Leader tidak dapat keluar dari grup dengan cara ini. Pertimbangkan untuk menghapus grup.",
      });
    }

    // 2. Cari entri keanggotaan
    const memberEntry = await GroupMember.findOne({
      where: {
        groupId: groupId,
        uid: userUid,
      },
    });

    if (!memberEntry) {
      return res.status(404).json({
        message: "Anda bukan anggota dari grup ini atau sudah keluar.",
      });
    }

    // 3. Hapus entri keanggotaan
    await memberEntry.destroy();

    res.status(200).json({
      message: `Anda (UID: ${userUid}) berhasil keluar dari grup ${group.groupName}.`,
    });
  } catch (error) {
    console.error("Error saat keluar dari grup:", error);
    res
      .status(500)
      .json({ message: "Gagal keluar dari grup.", error: error.message });
  }
};
