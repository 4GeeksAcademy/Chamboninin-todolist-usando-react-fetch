import React, { useEffect, useState } from "react";
import "../../styles/index.css";

const urlBase = "https://playground.4geeks.com/todo";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && input.trim() !== "") {
      setTasks([...tasks, { label: input.trim(), id: Date.now() }]);
      setInput("");
    }
  };

  const deleteTask = (idToDelete) => {
    setTasks(tasks.filter((task) => task.id !== idToDelete));
  };

  const getAllTask = async () => {
    try {
      const response = await fetch(`${urlBase}/users/Chambonini`);
      const data = await response.json();

      if (response.ok) {
        setTasks(data.todos);
      }
      if (response.status === 404) {
        // crear usuario aquí si no existe
      }
    } catch (error) {
      console.log(error);
    }
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
          {tasks.map((item) => (
            <li key={item.id} className="todo-item">
              {item.label}
              <span className="delete" onClick={() => deleteTask(item.id)}>
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
