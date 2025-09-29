import ToDo from "./components/toDo/toDo";
import Schema from "./components/schema/schema";
import { useState } from "react";
import "./app.css";

function App() {
  const [tasks, setTasks] = useState([]);

  return (
    <div className="app-body">
      <ToDo tasks={tasks} setTasks={setTasks} />
      <Schema tasks={tasks} />
    </div>
  );
}

export default App;
