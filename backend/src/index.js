import "dotenv/config";
import express from "express";
import cors from "cors";
import pool, { initDB } from "./db.js";


const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("🚀 API Todo funcionando correctamente");
});

app.get("/tasks", async (req, res) => {
  const result = await pool.query("SELECT * FROM tasks ORDER BY id");
  res.json(result.rows);
});

app.post("/tasks", async (req, res) => {
  const { text } = req.body;
  const result = await pool.query(
    "INSERT INTO tasks (text) VALUES ($1) RETURNING *",
    [text]
  );
  res.status(201).json(result.rows[0]);
});

app.patch("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  await pool.query(
    "UPDATE tasks SET completed = NOT completed WHERE id = $1",
    [id]
  );
  res.json({ ok: true });
});

app.delete("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM tasks WHERE id = $1", [id]);
  res.json({ ok: true });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log(`✅ Backend corriendo en puerto ${PORT}`);
  await initDB(); // 👈 CLAVE
});
