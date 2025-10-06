import React, { useEffect, useState } from "react";
import "./schema.css";

const Schema = ({ tasks = [] }) => {
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

  const [weekOffset, setWeekOffset] = useState(0);

  useEffect(() => {
    console.log(tasks);
    if (tasks.length > 0) {
      const task = tasks[tasks.length - 1];
      const rightDay = getWeekday(task.day).toLowerCase();

      setDay((prev) => ({
        ...prev,
        [rightDay]: [...prev[rightDay], task],
      }));
    }
  }, [tasks]);

  const startOfWeek = (date) => {
    const dayNum = date.getDay();
    const diffToMonday = dayNum === 0 ? -6 : 1 - dayNum;
    const monday = new Date(date);
    monday.setDate(date.getDate() + diffToMonday);
    monday.setHours(0, 0, 0, 0);
    return monday;
  };

  const addDays = (date, days) => {
    date.setDate(date.getDate() + days);
    date.setHours(0, 0, 0, 0);
    return date;
  };

  const toYMD = (d) => {
    const yy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yy}-${mm}-${dd}`;
  };

  const todayMonday = startOfWeek(new Date());
  const currentWeekMonday = addDays(todayMonday, weekOffset * 7);

  return (
    <div className="schema-box">
      <div style={{ marginBottom: 10 }}>
        <button onClick={() => setWeekOffset((w) => w - 1)}>Tidigare</button>
      </div>

      {Object.entries(day).map(([dayName, tasksArray], idx) => {
        const dateForColumn = addDays(currentWeekMonday, idx);
        const dateYMD = toYMD(dateForColumn);

        const visibleTasks = tasksArray.filter((task) => {
          const t = new Date(task.day);
          return toYMD(t) === dateYMD;
        });

        return (
          <div key={dayName}>
            <h2>{dayName.charAt(0).toUpperCase() + dayName.slice(1)}</h2>
            <div>{dateYMD}</div>

            {visibleTasks.map((task) => (
              <div className="schema-task" key={task.id}>
                <div className="schema-task-head">
                  <h5>{task.time} </h5> - <h4>{task.text}</h4>
                </div>
                <p> {task.description}</p>
              </div>
            ))}
          </div>
        );
      })}

      <div>
        <button onClick={() => setWeekOffset((w) => w + 1)}>Senare</button>
      </div>
    </div>
  );
};

export default Schema;
