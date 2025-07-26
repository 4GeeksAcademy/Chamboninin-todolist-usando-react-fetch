import React, { useEffect, useState } from "react";
import "../../styles/index.css";

const urlBase = "https://playground.4geeks.com/todo";
const username = "Chambonini";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  // Obtener tareas del servidor al cargar
  useEffect(() => {
    getAllTasks();
  }, []);

  // Crear usuario si no existe
  const createUser = async () => {
    try {
      const response = await fetch(`${urlBase}/users/${username}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify([]),
      });
      if (response.ok) {
        getAllTasks();
      }
    } catch (error) {
      console.error("Error al crear usuario:", error);
    }
  };

  // Obtener todas las tareas del usuario
  const getAllTasks = async () => {
    try {
      const response = await fetch(`${urlBase}/users/${username}`);
      if (response.ok) {
        const data = await response.json();
        setTasks(data.todos);
      } else if (response.status === 404) {
        createUser();
      }
    } catch (error) {
      console.error("Error al obtener tareas:", error);
    }
  };

  // Agregar una tarea nueva con POST
  const addTask = async () => {
    const newTask = { label: input.trim(), is_done: false };
    if (newTask.label === "") return;

    try {
      const response = await fetch(`${urlBase}/todos/${username}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      });

      if (response.ok) {
        setInput("");
        getAllTasks();
      } else {
        console.error("Error al agregar tarea");
      }
    } catch (error) {
      console.error("Error en POST:", error);
    }
  };

  // Eliminar una tarea por ID
  const deleteTask = async (id) => {
    try {
      const response = await fetch(`${urlBase}/todos/${id}`, {
        method: "DELETE"
      });

      if (response.ok) {
        getAllTasks();
      } else {
        console.error("Error al eliminar tarea");
      }
    } catch (error) {
      console.error("Error en DELETE:", error);
    }
  };

  // Limpiar todas las tareas
  const clearAllTasks = async () => {
    try {
      const response = await fetch(`${urlBase}/users/${username}`, {
        method: "DELETE"
      });
      if (response.ok) {
        await createUser(); // recrear usuario y lista vacía
      }
    } catch (error) {
      console.error("Error al limpiar tareas:", error);
    }
  };

  return (
    <div className="main">
      <h1 className="title">todos</h1>
      <div className="todo-container">
        <input
          className="todo-input"
          placeholder="What needs to be done?"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") addTask();
          }}
        />
        <ul className="todo-list">
          {tasks.map((task) => (
            <li key={task.id} className="todo-item">
              {task.label}
              <span className="delete" onClick={() => deleteTask(task.id)}>×</span>
            </li>
          ))}
        </ul>
        <div className="todo-footer">
          {tasks.length} item{tasks.length !== 1 ? "s" : ""} left
          <button onClick={clearAllTasks} style={{ float: "right", border: "none", background: "transparent", color: "#aaa", cursor: "pointer" }}>
            Clear all
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;