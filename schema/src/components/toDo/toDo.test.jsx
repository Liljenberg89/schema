import { describe, it, expect } from "vitest";

describe("ToDo addTask", () => {
  it("should add a new task if all fields are filled", () => {
    const tasks = [];
    const setTasks = (newTasks) => {
      tasks.push(...newTasks); 
    };

    const addTask = (taskText, taskDescription, taskTime, taskDay) => {
      if (!taskText || !taskDescription || !taskTime || !taskDay) return;
      const newTask = {
        id: 123, //istället för Date.now()
        text: taskText,
        description: taskDescription,
        time: taskTime,
        day: taskDay,
        done: false,
      };
      setTasks([newTask]);
    };

    addTask("Test", "Beskrivning", "12:00", "2025-10-06");

    expect(tasks.length).toBe(1);
    expect(tasks[0].text).toBe("Test");
    expect(tasks[0].description).toBe("Beskrivning");
    expect(tasks[0].time).toBe("12:00");
    expect(tasks[0].day).toBe("2025-10-06");
    expect(tasks[0].done).toBe(false);
  });

  it("should not add a task if a field is missing", () => {
    const tasks = [];
    const setTasks = (newTasks) => {
      tasks.push(...newTasks);
    };

    const addTask = (taskText, taskDescription, taskTime, taskDay) => {
      if (!taskText || !taskDescription || !taskTime || !taskDay) return;
      const newTask = { id: 123, text: taskText, description: taskDescription, time: taskTime, day: taskDay, done: false };
      setTasks([newTask]);
    };

    addTask("", "Beskrivning", "12:00", "2025-10-06");

    expect(tasks.length).toBe(0);
  });
});
