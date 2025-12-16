import { useState } from "react";
import { TrashIcon, PencilIcon, CheckIcon, XMarkIcon } from "@heroicons/react/24/solid";

export default function TodoItem({
  tarea,
  toggleCompleted,
  eliminarTarea,
  editTask
}) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(tarea.text);

  const guardar = () => {
    editTask(tarea.id, text);
    setEditing(false);
  };

  return (
    <div className="flex justify-between items-center bg-gray-800 text-white p-4 mb-2 rounded">
      
      {/* TEXTO / INPUT */}
      {editing ? (
        <input
          className="flex-1 mr-3 p-1 text-black rounded"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && guardar()}
          autoFocus
        />
      ) : (
        <span
          className={`flex-1 ${
            tarea.completed ? "line-through text-gray-400" : "text-gray-200"
          }`}
        >
          {tarea.text}
        </span>
      )}

      {/* ACCIONES */}
      <div className="flex items-center gap-3">
        {!editing && (
          <input
            className="w-4 h-4"
            type="checkbox"
            checked={tarea.completed}
            onChange={() => toggleCompleted(tarea.id)}
          />
        )}

        {editing ? (
          <>
            <button onClick={guardar}>
              <CheckIcon className="w-5 h-5 text-green-400" />
            </button>
            <button onClick={() => setEditing(false)}>
              <XMarkIcon className="w-5 h-5 text-gray-400" />
            </button>
          </>
        ) : (
          <button onClick={() => setEditing(true)}>
            <PencilIcon className="w-5 h-5 text-blue-400" />
          </button>
        )}

        <button onClick={() => eliminarTarea(tarea.id)}>
          <TrashIcon className="w-5 h-5 text-red-500" />
        </button>
      </div>
    </div>
  );
}
