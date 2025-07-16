import React, { useEffect, useState } from "react";
import "../../styles/index.css";

const urlBase = "https://playground.4geeks.com/todo";
const username = "Chambonini";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  // Leer desde localStorage al iniciar
  useEffect(() => {
    const localTasks = localStorage.getItem("localTasks");
    if (localTasks) {
      setTasks(JSON.parse(localTasks));
    } else {
      getAllTask(); // Solo llama API si no hay local
    }
  }, []);

  // Cada cambio en tasks actualiza localStorage
  useEffect(() => {
    localStorage.setItem("localTasks", JSON.stringify(tasks));
  }, [tasks]);

  // Crear usuario
  const createUser = async () => {
    try {
      const response = await fetch(`${urlBase}/users/${username}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify([]),
      });
      if (response.ok) console.log("Usuario creado");
    } catch (error) {
      console.error("Error al crear usuario:", error);
    }
  };

  // Obtener tareas desde API si no hay localStorage
  const getAllTask = async () => {
    try {
      const response = await fetch(`${urlBase}/users/${username}`);
      const data = await response.json();
      if (response.ok) {
        setTasks(data.todos);
      } else if (response.status === 404) {
        await createUser();
      }
    } catch (error) {
      console.error("Error obteniendo tareas:", error);
    }
  };

  // Actualizar API siempre que cambien las tareas
  const updateTasksAPI = async (updatedTasks) => {
    try {
      await fetch(`${urlBase}/users/${username}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ todos: updatedTasks }),
      });
    } catch (error) {
      console.error("Error actualizando API:", error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && input.trim() !== "") {
      const newTask = { label: input.trim(), is_done: false };
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      updateTasksAPI(updatedTasks);
      setInput("");
    }
  };

  const deleteTask = (indexToDelete) => {
    const updatedTasks = tasks.filter((_, index) => index !== indexToDelete);
    setTasks(updatedTasks);
    updateTasksAPI(updatedTasks);
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
          onKeyDown={handleKeyDown}
        />
        <ul className="todo-list">
          {tasks.map((item, index) => (
            <li key={index} className="todo-item">
              {item.label}
              <span className="delete" onClick={() => deleteTask(index)}>×</span>
            </li>
          ))}
        </ul>
        <div className="todo-footer">
          {tasks.length} item{tasks.length !== 1 ? "s" : ""} left
        </div>
      </div>
    </div>
  );
};

export default Home;