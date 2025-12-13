import pool from "../utils/db.js";

export const getTasks = async (req, res) => {
  const result = await pool.query(
    "SELECT * FROM tasks WHERE user_id = $1 ORDER BY deadline",
    [req.user.id]
  );

  res.json(result.rows);
};

export const createTask = async (req, res) => {
  const { title, description, deadline, priority } = req.body;

  const result = await pool.query(
    `INSERT INTO tasks (title, description, deadline, priority, user_id)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [title, description, deadline, priority, req.user.id]
  );

  res.json(result.rows[0]);
};

export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, deadline, priority } = req.body;

  const result = await pool.query(
    `UPDATE tasks
     SET title=$1, description=$2, deadline=$3, priority=$4
     WHERE id=$5 AND user_id=$6
     RETURNING *`,
    [title, description, deadline, priority, id, req.user.id]
  );

  res.json(result.rows[0]);
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;

  await pool.query(
    "DELETE FROM tasks WHERE id=$1 AND user_id=$2",
    [id, req.user.id]
  );

  res.json({ message: "Mission deleted" });
};
