import React, { useState, useEffect } from "react";
import "../../styles/index.css";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  const API_URL = "https://playground.4geeks.com/todo/users/Chambonini";

  // Cargar tareas iniciales desde API al montar
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.todos)) {
          const taskLabels = data.todos.map((task) => task.label);
          setTasks(taskLabels);
        } else {
          console.error("Formato inesperado:", data);
        }
      })
      .catch((err) => console.error("Error cargando tareas:", err));
  }, []);

  // Usar tu función original para agregar tareas localmente
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && input.trim() !== "") {
      setTasks([...tasks, input.trim()]);
      setInput("");
    }
  };

  const deleteTask = (indexToDelete) => {
    setTasks(tasks.filter((_, index) => index !== indexToDelete));
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>todos</h1>
      <div className="todo-container">
        <input
          placeholder="What needs to be done?"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        {tasks.map((task, index) => (
          <div key={index} className="todo-item">
            <span>{task}</span>
            <button onClick={() => deleteTask(index)}>×</button>
          </div>
        ))}
        <div className="todo-footer">
          {tasks.length} item{tasks.length !== 1 ? "s" : ""} left
        </div>
      </div>
    </div>
  );
};

export default Home;