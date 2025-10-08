import ToDo from "./components/toDo/toDo";
import Schema from "./components/schema/schema";
import { useState } from "react";
import "./app.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("Alla");

  return (
    <div className="app-body">
      <ToDo
        tasks={tasks}
        setTasks={setTasks}
        filter={filter}
        setFilter={setFilter}
      />
      <Schema tasks={tasks} filter={filter} />
    </div>
  );
}

export default App;
