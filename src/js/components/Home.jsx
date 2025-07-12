import React, { useEffect, useState } from "react";
import "../../styles/index.css";

const urlBase = "https://playground.4geeks.com/todo";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  // Crear usuario si no existe
  const createUser = async () => {
    try {
      const response = await fetch(`${urlBase}/users/Chambonini`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        console.log("Usuario creado");
      }
    } catch (error) {
      console.error("Error al crear usuario:", error);
    }
  };

  // Obtener tareas desde la API
  const getAllTask = async () => {
    try {
      const response = await fetch(`${urlBase}/users/Chambonini`);
      const data = await response.json();

      if (response.ok) {
        setTasks(data.todos);
      } else if (response.status === 404) {
        console.warn("Usuario no encontrado, creando...");
        await createUser();
        setTasks([]);
      }
    } catch (error) {
      console.error("Error al obtener tareas:", error);
    }
  };

  // Actualizar tareas en la API
  const updateTasks = async (updatedTasks) => {
    try {
      await fetch(`${urlBase}/users/Chambonini`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ todos: updatedTasks }),
      });
    } catch (error) {
      console.error("Error al actualizar tareas:", error);
    }
  };

  // Agregar nueva tarea
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && input.trim() !== "") {
      const newTask = {
        label: input.trim(),
        is_done: false,
      };
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      updateTasks(updatedTasks);
      setInput("");
    }
  };

  // Eliminar tarea por índice
  const deleteTask = (indexToDelete) => {
    const updatedTasks = tasks.filter((_, index) => index !== indexToDelete);
    setTasks(updatedTasks);
    updateTasks(updatedTasks);
  };

  useEffect(() => {
    getAllTask();
  }, []);

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
              <span className="delete" onClick={() => deleteTask(index)}>
                ×
              </span>
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
