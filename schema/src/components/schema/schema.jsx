import React, { useState } from "react";
import "./schema.css";

const Schema = ({ tasks = [], filter = "Alla" }) => {
  const [weekOffset, setWeekOffset] = useState(0);

  const startOfWeek = (date) => {
    const dayNum = date.getDay();
    const diffToMonday = dayNum === 0 ? -6 : 1 - dayNum;
    const monday = new Date(date);
    monday.setDate(date.getDate() + diffToMonday);
    monday.setHours(0, 0, 0, 0);
    return monday;
  };

  const addDays = (date, days) => {
    const d = new Date(date);
    d.setDate(d.getDate() + days);
    d.setHours(0, 0, 0, 0);
    return d;
  };

  const toYMD = (d) => {
    const yy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yy}-${mm}-${dd}`;
  };

  const makeEmptyDays = () => ({
    måndag: [],
    tisdag: [],
    onsdag: [],
    torsdag: [],
    fredag: [],
    lördag: [],
    söndag: [],
  });

  const days = makeEmptyDays();

  for (const task of tasks) {
    if (!task.day) {
      continue;
    }
    const d = new Date(task.day);
    if (isNaN(d)) {
      continue;
    }
    const dayName = d
      .toLocaleDateString("sv-SE", { weekday: "long" })
      .toLowerCase();
    days[dayName]?.push(task);
  }

  Object.keys(days).forEach((k) => {
    days[k].sort((a, b) => (a.time ?? "").localeCompare(b.time ?? ""));
  });

  const todayMonday = startOfWeek(new Date());
  const currentWeekMonday = addDays(todayMonday, weekOffset * 7);

  return (
    <div className="schema-box">
      <div style={{ marginBottom: 10 }}>
        <button onClick={() => setWeekOffset((w) => w - 1)}>Tidigare</button>
      </div>

      {Object.entries(days).map(([dayName, tasksArray], idx) => {
        const dateForColumn = addDays(currentWeekMonday, idx);
        const dateYMD = toYMD(dateForColumn);

        const visibleTasks = tasksArray.filter((task) => {
          const t = new Date(task.day);
          if (isNaN(t)) {
            return false;
          }
          if (toYMD(t) !== dateYMD) {
            return false;
          }
          if (filter && filter !== "Alla" && task.category !== filter)
            return false;
          return true;
        });

        return (
          <div
            key={dayName}
            className="schema-day-column"
            data-cy={`day-${dayName}`}
            style={{ marginBottom: 12 }}
          >
            <h2>{dayName.charAt(0).toUpperCase() + dayName.slice(1)}</h2>
            <div>{dateYMD}</div>

            {visibleTasks.length === 0 && (
              <div className="schema-empty">Inga uppgifter</div>
            )}

            {visibleTasks.map((task) => (
              <div className="schema-task" key={task.id} data-cy="task">
                <div className="schema-task-head">
                  <h5>{task.time} </h5> - <h4>{task.text}</h4>
                </div>
                <p>{task.description}</p>
                <small>Kategori: {task.category}</small>
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
