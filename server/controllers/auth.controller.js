import pool from "../utils/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const generateToken = (user) =>
  jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

export const signup = async (req, res) => {
  const { trainerName, email, password } = req.body;

  const exists = await pool.query(
    "SELECT id FROM users WHERE email = $1",
    [email]
  );

  if (exists.rows.length > 0) {
    return res.status(400).json({ message: "Trainer already exists" });
  }

  const hashed = await bcrypt.hash(password, 10);

  const result = await pool.query(
    `INSERT INTO users (trainer_name, email, password)
     VALUES ($1, $2, $3)
     RETURNING id, trainer_name, email`,
    [trainerName, email, hashed]
  );

  const user = result.rows[0];

  res.json({ token: generateToken(user), user });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const result = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );

  if (result.rows.length === 0) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const user = result.rows[0];
  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  res.json({
    token: generateToken(user),
    user: {
      id: user.id,
      trainerName: user.trainer_name,
      email: user.email,
    },
  });
};
