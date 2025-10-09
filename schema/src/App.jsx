import ToDo from "./components/toDo/toDo";
import Schema from "./components/schema/schema";
import { useState } from "react";
import "./app.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("Alla");

  return (
    <div className="app-body">
      <div className="todo-main">
        <ToDo
          tasks={tasks}
          setTasks={setTasks}
          filter={filter}
          setFilter={setFilter}
        />
      </div>

      <div className="schema-main">
        <Schema tasks={tasks} filter={filter} />
      </div>
    </div>
  );
}

export default App;
