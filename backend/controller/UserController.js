import User from "../model/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      return res.status(404).json({ message: "Email tidak tersedia!" });
    }
    const validatePass = await bcrypt.compare(password, user.password);
    if (!validatePass) {
      return res.status(401).json({ message: "Password salah!" });
    }
    const accessToken = jwt.sign(
      { id: user.id, email: user.email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30s" }
    );
    const generateToken = jwt.sign(
      { id: user.id, email: user.email },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    await User.update(
      { refreshToken: generateToken },
      { where: { id: user.id } }
    );
    res.cookie("refreshToken", generateToken, {
      httpOnly: false,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      sameSite: "none", // ❗️ WAJIB kalau frontend/backend beda domain
      secure: true, // ❗️ WAJIB kalau pakai https
    });
    res.cookie("uId", user.id, {
      httpOnly: false,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      sameSite: "none", // ❗️ WAJIB kalau frontend/backend beda domain
      secure: true, // ❗️ WAJIB kalau pakai https
    });

    console.log(generateToken);

    return res.status(200).json({
      accessToken,
      uId: user.id,
      // refreshToken: generateToken,
      message: "Login berhasil!",
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal melakukan login!",
      error: error.message,
    });
  }
};

export const createUser = async (req, res) => {
  const { email, password } = req.body;

  //Validasi format email menggunakan regex
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      message: "Email tidak valid!",
    });
  }

  const passEncrypt = await bcrypt.hash(password, 5);
  try {
    const data = await User.create({
      email,
      password: passEncrypt,
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

export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(401);

    const user = await User.findOne({
      where: { refresh_token: refreshToken },
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

        const { id, email } = user;
        const accessToken = jwt.sign(
          { id, email },
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
      where: { refresh_token: refreshToken },
    });
    if (!data) return res.status(204).json("User Tidak Ditemukan");
    await User.update({ refresh_token: null }, { where: { id: data.id } });

    res.clearCookie("refreshToken", {
      sameSite: "none",
      secure: true,
    });
    res.clearCookie("uId", {
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
