import User from "../model/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";

const loginHelper = async (user, res) => {
  const accessToken = jwt.sign(
    {
      id: user.uid,
      email: user.email,
      userName: user.userName,
      role: user.role,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1h" }
  );

  const refreshToken = jwt.sign(
    {
      id: user.uid,
      email: user.email,
      userName: user.userName,
      role: user.role,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "1d" }
  );

  await User.update({ refreshToken }, { where: { uid: user.uid } });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: false,
    maxAge: 24 * 60 * 60 * 1000,
    sameSite: "none",
    secure: true,
  });

  res.cookie("uid", user.uid, {
    httpOnly: false,
    maxAge: 24 * 60 * 60 * 1000,
    sameSite: "none",
    secure: true,
  });

  return res.status(200).json({
    accessToken,
    uid: user.uid,
    message: "Login berhasil!",
  });
};

export const loginAsAdmin = async (req, res) => {
  const { data, password } = req.body;

  try {
    const user = await User.findOne({
      where: { [Op.or]: [{ userName: data }, { email: data }] },
    });

    if (!user) {
      return res.status(404).json({ message: "Tidak ada data tersedia!" });
    }

    if (user.role !== 1) {
      return res.status(403).json({ message: "Akses hanya untuk admin!" });
    }

    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) {
      return res.status(401).json({ message: "Password salah!" });
    }

    return loginHelper(user, res);
  } catch (error) {
    return res.status(500).json({
      message: "Gagal melakukan login admin!",
      error: error.message,
    });
  }
};

export const loginAsUser = async (req, res) => {
  const { data, password } = req.body;

  try {
    const user = await User.findOne({
      where: { [Op.or]: [{ userName: data }, { email: data }] },
    });

    if (!user) {
      return res.status(404).json({ message: "Tidak ada data tersedia!" });
    }

    if (user.role !== 0) {
      return res.status(403).json({ message: "Akses hanya untuk user biasa!" });
    }

    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) {
      return res.status(401).json({ message: "Password salah!" });
    }

    return loginHelper(user, res);
  } catch (error) {
    return res.status(500).json({
      message: "Gagal melakukan login user!",
      error: error.message,
    });
  }
};

export const registerAsUser = async (req, res) => {
  const { userName, email, password, confirmPassword, phoneNumber } = req.body;
  try {
    if (!userName || !email || !password || !confirmPassword || !phoneNumber) {
      return res.status(400).json({ message: "Semua field wajib diisi" });
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Email tidak valid!" });
    }

    const emailExists = await User.findOne({ where: { email } });
    if (emailExists) {
      return res.status(409).json({ message: "Email sudah digunakan" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Password tidak cocok" });
    }

    const passEncrypt = await bcrypt.hash(password, 5);

    const data = await User.create({
      userName,
      email,
      phoneNumber,
      password: passEncrypt,
      role: 0, // user biasa
    });

    res.status(201).json({
      message: "User berhasil dibuat!",
      data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal membuat user!",
      error: error.message,
    });
  }
};

export const registerAsAdmin = async (req, res) => {
  const { userName, email, password, confirmPassword, phoneNumber } = req.body;
  try {
    if (!userName || !email || !password || !confirmPassword || !phoneNumber) {
      return res.status(400).json({ message: "Semua field wajib diisi" });
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Email tidak valid!" });
    }

    const emailExists = await User.findOne({ where: { email } });
    if (emailExists) {
      return res.status(409).json({ message: "Email sudah digunakan" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Password tidak cocok" });
    }

    const passEncrypt = await bcrypt.hash(password, 5);

    const data = await User.create({
      userName,
      email,
      phoneNumber,
      password: passEncrypt,
      role: 1, // admin
    });

    res.status(201).json({
      message: "Admin berhasil dibuat!",
      data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal membuat admin!",
      error: error.message,
    });
  }
};

export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(401);

    const user = await User.findOne({
      where: { refreshToken: refreshToken },
    });
    if (!user)
      return res.status(403).json({ message: "Gagal mendapatkan user!" });

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err) {
          return res.status(403).json({ message: "Invalid refresh token!" });
        }

        const { uid, email, userName, role } = user;
        const accessToken = jwt.sign(
          { uid, email, userName, role },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "30s" }
        );
        res.json({ accessToken });
      }
    );
  } catch (error) {
    res.status(500).json({
      message: "Error refresh token!",
      error: error.message,
    });
  }
};

export const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(204);

    const data = await User.findOne({
      where: { refreshToken: refreshToken },
    });
    if (!data) return res.status(204).json("User Tidak Ditemukan");
    await User.update({ refreshToken: null }, { where: { uid: data.uid } });

    res.clearCookie("refreshToken", {
      sameSite: "none",
      secure: true,
    });
    res.clearCookie("uid", {
      sameSite: "none",
      secure: true,
    });
    return res.status(200).json({
      message: "Berhasil melakukan logout!",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error logout!",
      error: error.message,
    });
  }
};
