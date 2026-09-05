import jwt from "jsonwebtoken";

// In production, set JWT_SECRET as a real environment variable/secret.
const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-in-production";

export function signToken(user) {
  return jwt.sign({ id: user.id, email: user.email, name: user.name }, JWT_SECRET, {
    expiresIn: "8h",
  });
}

export function requireAuth(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Missing or invalid authorization header." });
  }

  const token = header.replace("Bearer ", "");
  try {
    req.admin = jwt.verify(token, JWT_SECRET);
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
}
