// Middleware spesifik untuk admin (role 1)
export const isAdmin = (req, res, next) => {
  if (!req.user || typeof req.user.role === "undefined") {
    console.error(
      "Error: req.user or req.user.role is not defined. Ensure verifyToken runs before isAdmin."
    );
    return res.status(403).json({
      message: "Forbidden: User role not available for authorization.",
    });
  }

  if (req.user.role === 1) {
    // 1 adalah Admin
    next();
  } else {
    res
      .status(403)
      .json({ message: "Forbidden: Administrator access required." });
  }
};

// Middleware spesifik untuk pengguna biasa (role 0)
export const isRegularUser = (req, res, next) => {
  if (!req.user || typeof req.user.role === "undefined") {
    console.error(
      "Error: req.user or req.user.role is not defined. Ensure verifyToken runs before isRegularUser."
    );
    return res.status(403).json({
      message: "Forbidden: User role not available for authorization.",
    });
  }

  if (req.user.role === 0) {
    // 0 adalah Pengguna Biasa
    next();
  } else {
    res
      .status(403)
      .json({ message: "Forbidden: Regular user access required." });
  }
};
