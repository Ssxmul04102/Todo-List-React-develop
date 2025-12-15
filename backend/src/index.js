import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

let tareas = [];

app.get("/tasks", (req, res) => {
  res.json(tareas);
});

app.post("/tasks", (req, res) => {
  const nueva = {
    id: Date.now(),
    text: req.body.text,
    completed: false
  };
  tareas.push(nueva);
  res.status(201).json(nueva);
});

app.patch("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  tareas = tareas.map(t =>
    t.id === id ? { ...t, completed: !t.completed } : t
  );
  res.json({ ok: true });
});

app.delete("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  tareas = tareas.filter(t => t.id !== id);
  res.json({ ok: true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Backend corriendo en puerto ${PORT}`);
});
