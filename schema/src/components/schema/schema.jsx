import React, { use, useEffect, useState } from "react";
import "./schema.css";

const Schema = ({ tasks }) => {
  const getWeekday = (taskDay) => {
    const date = new Date(taskDay);
    return date.toLocaleDateString("sv-SE", { weekday: "long" });
  };

  const [day, setDay] = useState({
    måndag: [],
    tisdag: [],
    onsdag: [],
    torsdag: [],
    fredag: [],
    lördag: [],
    söndag: [],
  });

  useEffect(() => {
    if (tasks.length > 0) {
      const task = tasks[tasks.length - 1];
      const rightDay = getWeekday(task.day).toLowerCase();

      setDay((prev) => ({
        ...prev,
        [rightDay]: [...prev[rightDay], task],
      }));
    }
  }, [tasks]);

  useEffect(() => {
    console.log(tasks);
  }, [tasks]);

  return (
    <div className="schema-box">
      {Object.entries(day).map(([dayName, tasksArray]) => (
        <div className="day-column" key={dayName}>
          <h2 className="days">
            {dayName.charAt(0).toUpperCase() + dayName.slice(1)}
          </h2>
          {tasksArray.map((task) => (
            <div key={task.id}>
              <h4>
                {task.time} {task.text}
              </h4>
              <span> {task.description}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Schema;
