import { useState } from "react";
import "./toDo.css";

const ToDo = ({ tasks, setTasks, filter, setFilter }) => {
  const [taskText, setTaskText] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskTime, setTaskTime] = useState("");
  const [taskDay, setTaskDay] = useState("");
  const [taskCategory, setTaskCategory] = useState("Jobb");

  const addTask = (e) => {
    e.preventDefault();
    if (!taskText || !taskDescription || !taskTime || !taskDay) return;
    const newTask = {
      id: Date.now(),
      text: taskText,
      description: taskDescription,
      time: taskTime,
      day: taskDay,
      category: taskCategory,
      done: false,
    };
    setTasks([...tasks, newTask]);
    setTaskText("");
    setTaskDescription("");
    setTaskTime("");
    setTaskDay("");
    setTaskCategory("Jobb");
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

  const filteredTasks =
    filter === "Alla"
      ? tasks
      : tasks.filter((task) => task.category === filter);

  return (
    <div className="toDo-container">
      <h1>📝 To-Do List</h1>

      <form onSubmit={addTask}>
        <input
          id="toDo-input"
          type="text"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          placeholder="Titel"
        />
        <input
          type="text"
          id="toDo-input"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          placeholder="Beskrivning"
        />
        <input
          type="time"
          id="toDo-input"
          value={taskTime}
          onChange={(e) => setTaskTime(e.target.value)}
        />
        <input
          type="date"
          id="toDo-input"
          value={taskDay}
          onChange={(e) => setTaskDay(e.target.value)}
        />
        <label>
          Kategori:
          <select
            value={taskCategory}
            onChange={(e) => setTaskCategory(e.target.value)}
          >
            <option value="" disabled>
              Välj kategori
            </option>
            <option value="Jobb">Jobb</option>
            <option value="Skola">Skola</option>
            <option value="Kul">Kul</option>
          </select>
        </label>

        <button id="toDo-input" type="submit">
          Lägg till
        </button>
      </form>

      {["Alla", "Jobb", "Skola", "Kul"].map((cat) => (
        <button
          key={cat}
          data-cy={`filter-${cat}`}
          onClick={() => setFilter(cat)}
          className={filter === cat ? "active" : ""}
          style={{ marginRight: 6 }}
        >
          {cat}
        </button>
      ))}


      <ul>
        {filteredTasks.map((task) => (
          <li key={task.id} style={{ marginBottom: 8 }}>
            <span
              onClick={() => toggleDone(task.id)}
              style={{
                cursor: "pointer",
                textDecoration: task.done ? "line-through" : "none",
              }}
            >
              <strong>{task.text}</strong> ({task.category}) <br />
              {task.description} <br />
              Tid: {task.time} | Dag: {task.day}
            </span>
            <button
              onClick={() => deleteTask(task.id)}
              style={{ marginLeft: 8 }}
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToDo;
