import { useState } from "react";
import "./toDo.css";

const ToDo = ({ tasks, setTasks }) => {
  const [taskText, setTaskText] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskTime, setTaskTime] = useState("");
  const [taskDay, setTaskDay] = useState("");

  const addTask = (e) => {
    e.preventDefault();
    if (!taskText || !taskDescription || !taskTime || !taskDay) return;
    const newTask = {
      id: Date.now(),
      text: taskText,
      description: taskDescription,
      time: taskTime,
      day: taskDay,
      done: false,
    };
    setTasks([...tasks, newTask]);
    setTaskText("");
    setTaskDescription("");
    setTaskTime("");
    setTaskDay("");
  };

  const toggleDone = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="toDo-container">
      <h1>📝 To-Do List</h1>

      <form onSubmit={addTask}>
        <input
          type="text"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          placeholder="Titel"
        />
        <input
          type="text"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          placeholder="Beskrivning"
        />
        <input
          type="time"
          value={taskTime}
          onChange={(e) => setTaskTime(e.target.value)}
        />
        <input
          type="date"
          value={taskDay}
          onChange={(e) => setTaskDay(e.target.value)}
        />
        <button type="submit">Lägg till</button>
      </form>
      {/* 
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <span
              onClick={() => toggleDone(task.id)}
              style={{
                cursor: "pointer",
                textDecoration: task.done ? "line-through" : "none",
              }}
            >
              <strong>{task.text}</strong> <br />
              {task.description} <br />
              Tid: {task.time} | Dag: {task.day}
            </span>
            <button onClick={() => deleteTask(task.id)}>❌</button>
          </li>
        ))}
      </ul>
      */}
    </div>
  );
};

export default ToDo;
