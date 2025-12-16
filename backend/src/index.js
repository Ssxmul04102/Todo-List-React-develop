import "dotenv/config";
import express from "express";
import cors from "cors";
import pool, { initDB } from "../db.js";

const app = express();
app.use(cors());
app.use(express.json());

/* ---------- ROOT ---------- */
app.get("/", (req, res) => {
  res.send("🚀 API Todo funcionando correctamente");
});

/* ---------- GET TASKS ---------- */
app.get("/tasks", async (req, res) => {
  const result = await pool.query("SELECT * FROM tasks ORDER BY id");
  res.json(result.rows);
});

/* ---------- CREATE TASK ---------- */
app.post("/tasks", async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Text is required" });
  }

  const result = await pool.query(
    "INSERT INTO tasks (text) VALUES ($1) RETURNING *",
    [text]
  );

  res.status(201).json(result.rows[0]);
});

/* ---------- TOGGLE COMPLETED ---------- */
app.patch("/tasks/:id", async (req, res) => {
  const { id } = req.params;

  await pool.query(
    "UPDATE tasks SET completed = NOT completed WHERE id = $1",
    [id]
  );

  res.json({ ok: true });
});

/* ---------- ✏️ EDIT TASK TEXT ---------- */
app.put("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Text is required" });
  }

  const result = await pool.query(
    "UPDATE tasks SET text = $1 WHERE id = $2 RETURNING *",
    [text, id]
  );

  res.json(result.rows[0]);
});

/* ---------- DELETE TASK ---------- */
app.delete("/tasks/:id", async (req, res) => {
  const { id } = req.params;

  await pool.query("DELETE FROM tasks WHERE id = $1", [id]);
  res.json({ ok: true });
});

/* ---------- START SERVER ---------- */
const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log(`✅ Backend corriendo en puerto ${PORT}`);
  await initDB();
});
