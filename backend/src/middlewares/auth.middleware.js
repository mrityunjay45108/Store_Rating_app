const jwt = require("jsonwebtoken");
const pool = require("../config/database");

// Token Check karne ke liye
const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access token required" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const result = await pool.query(
      "SELECT id, name, email, address, role FROM users WHERE id = $1",
      [decoded.userId],
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = result.rows[0];
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

//  Generic Role Check (Multiple roles ke liye)
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        message: `Access denied. Requires one of: ${roles.join(", ")}` 
      });
    }
    next();
  };
};

// Strict System Administrator Check
const adminOnly = (req, res, next) => {
    if (req.user && req.user.role === 'system_administrator') {
        next();
    } else {
        res.status(403).json({ message: "Access denied. System Administrator only." });
    }
};

module.exports = { 
    authenticateToken, 
    authorizeRoles, 
    adminOnly 
};