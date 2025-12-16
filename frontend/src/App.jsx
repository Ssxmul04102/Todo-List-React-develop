import { useEffect, useState } from "react";
import TodoItem from "./TodoItem";

const API_URL = import.meta.env.VITE_API_URL;

export default function App() {
  const [tareas, setTareas] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);

  // 🔹 Cargar tareas
  const fetchTasks = async () => {
    try {
      const res = await fetch(`${API_URL}/tasks`);
      const data = await res.json();
      setTareas(data);
      setLoading(false);
    } catch (err) {
      console.error("Error cargando tareas:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // 🔹 Crear tarea
  const agregarTarea = async () => {
    if (!input.trim()) return;

    const res = await fetch(`${API_URL}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: input }),
    });

    const nueva = await res.json();
    setTareas([...tareas, nueva]);
    setInput("");
  };

  // 🔹 Completar tarea
  const toggleCompleted = async (id) => {
    await fetch(`${API_URL}/tasks/${id}`, { method: "PATCH" });

    setTareas(
      tareas.map(t =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  // 🔹 Editar tarea (NUEVO)
  const editTask = async (id, newText) => {
    if (!newText.trim()) return;

    await fetch(`${API_URL}/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: newText }),
    });

    fetchTasks();
  };

  // 🔹 Eliminar tarea
  const eliminarTarea = async (id) => {
    await fetch(`${API_URL}/tasks/${id}`, { method: "DELETE" });
    setTareas(tareas.filter(t => t.id !== id));
  };

  if (loading) {
    return <p className="text-center mt-10">Cargando tareas...</p>;
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-2 rounded shadow">
      <h1 className="text-3xl font-bold mb-5 text-center">
        APLICACION DE TAREAS
      </h1>

      <div className="flex gap-3 mb-5">
        <input
          className="flex-1 p-2 border rounded"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Añadir Tarea"
        />
        <button
          className="bg-blue-500 text-white px-4 rounded"
          onClick={agregarTarea}
        >
          Añadir
        </button>
      </div>

      <div className="space-y-2">
        {tareas.map(tarea => (
          <TodoItem
            key={tarea.id}
            tarea={tarea}
            toggleCompleted={toggleCompleted}
            eliminarTarea={eliminarTarea}
            editTask={editTask}   
          />
        ))}
      </div>
    </div>
  );
}
