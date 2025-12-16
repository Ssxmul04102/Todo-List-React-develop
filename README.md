# 📝 Todo List Fullstack (React + Node + PostgreSQL)

Aplicación **Fullstack** de tareas (Todo List) desarrollada con **React** en el frontend y **Node.js + Express + PostgreSQL** en el backend.  
Permite **crear, editar, completar y eliminar tareas**, con persistencia en base de datos y despliegue en **Railway**.

---

## 🚀 Demo
- **Backend:** Railway  
- **Base de datos:** PostgreSQL (Railway)
- **Frontend:** React + Vite

---

## ✨ Funcionalidades

- ✅ Crear tareas
- ✏️ Editar texto de tareas
- ☑️ Marcar tareas como completadas
- 🗑️ Eliminar tareas
- 💾 Persistencia en base de datos PostgreSQL
- 🎨 Interfaz limpia tipo lista blanca (UI minimalista)

---

## 🧱 Tecnologías utilizadas

### 🔹 Frontend
- React
- Vite
- Tailwind CSS
- Heroicons
- Fetch API

### 🔹 Backend
- Node.js
- Express
- PostgreSQL
- pg (node-postgres)
- dotenv
- cors

### 🔹 Deploy
- Railway (Backend + PostgreSQL)

---

## 📂 Estructura del proyecto

```bash
.
├── backend
│   ├── src
│   │   └── index.js
│   ├── db.js
│   ├── package.json
│   └── .env
│
├── frontend
│   ├── src
│   │   ├── App.jsx
│   │   ├── TodoItem.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── .env
## ⚙️ Variables de entorno

### Backend (`.env`)
```env
DATABASE_URL=postgresql://usuario:password@host:puerto/database
PORT=3000
VITE_API_URL=https://tu-backend.railway.app

## 🔌 Endpoints del Backend

| Método | Endpoint       | Descripción                                |
|--------|----------------|--------------------------------------------|
| GET    | `/`            | Verifica que la API funcione               |
| GET    | `/tasks`       | Obtiene todas las tareas                   |
| POST   | `/tasks`       | Crea una nueva tarea                       |
| PUT    | `/tasks/:id`   | Edita el texto de una tarea               |
| PATCH  | `/tasks/:id`   | Marca/desmarca como completada             |
| DELETE | `/tasks/:id`   | Elimina una tarea                          |

🧠 Aprendizajes del proyecto

Conexión React ↔ API REST

Uso de PostgreSQL en producción

Manejo de variables de entorno

Deploy real Fullstack

CRUD completo

Buenas prácticas con Git y GitHub

📌 Mejoras futuras

🔐 Autenticación de usuarios

🌙 Modo oscuro

🔍 Filtros de tareas

📱 Mejorar experiencia móvil

🧲 Drag & Drop

👨‍💻 Autor

Proyecto desarrollado por Johan Samuel 
Como parte del aprendizaje en desarrollo Fullstack.