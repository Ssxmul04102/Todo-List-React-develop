import { useState } from "react";
import {
  TrashIcon,
  PencilIcon,
  CheckIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";

export default function TodoItem({
  tarea,
  toggleCompleted,
  eliminarTarea,
  editTask,
}) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(tarea.text);

  const guardar = () => {
    if (!text.trim()) return;
    editTask(tarea.id, text);
    setEditing(false);
  };

  return (
    <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
      {/* TEXTO / INPUT */}
      {editing ? (
        <input
          className="flex-1 mr-3 px-2 py-1 border rounded text-gray-800"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && guardar()}
          autoFocus
        />
      ) : (
        <span
          className={`flex-1 ${
            tarea.completed
              ? "line-through text-gray-400"
              : "text-gray-800"
          }`}
        >
          {tarea.text}
        </span>
      )}

      {/* ACCIONES */}
      <div className="flex items-center gap-3 ml-3">
        {!editing && (
          <input
            type="checkbox"
            checked={tarea.completed}
            onChange={() => toggleCompleted(tarea.id)}
          />
        )}

        {editing ? (
          <>
            <button onClick={guardar} title="Guardar">
              <CheckIcon className="w-5 h-5 text-green-500" />
            </button>
            <button onClick={() => setEditing(false)} title="Cancelar">
              <XMarkIcon className="w-5 h-5 text-gray-400" />
            </button>
          </>
        ) : (
          <button onClick={() => setEditing(true)} title="Editar">
            <PencilIcon className="w-5 h-5 text-blue-500" />
          </button>
        )}

        <button onClick={() => eliminarTarea(tarea.id)} title="Eliminar">
          <TrashIcon className="w-5 h-5 text-red-500" />
        </button>
      </div>
    </div>
  );
}
