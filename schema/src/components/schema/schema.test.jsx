import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Schema from "./schema";

describe("Kollar om alla dagar visas", () => {
  it("visar texten rätt dagar", () => {
    render(<Schema />);

    expect(screen.getByText("Måndag")).toBeInTheDocument();
    expect(screen.getByText("Fredag")).toBeInTheDocument();
    expect(screen.getByText("Söndag")).toBeInTheDocument();
  });
});

describe("kollar om task visas", () => {
  const tasks = [
    {
      day: "2025-10-07",
      description: "Städa",
      text: "Städa rummet hemma",
      time: "18:34",
    },
  ];

  it("renderar tasks", () => {
    render(<Schema tasks={tasks} referenceDate={new Date("2025-10-07")} />);

    expect(screen.getByText("Städa rummet hemma")).toBeInTheDocument();
  });
});

describe("kollar om flera tasks visas på samma dag", () => {
  const tasks = [
    {
      day: "2025-10-07",
      description: "Städa",
      text: "Träna armar på gymmet",
      time: "18:34",
    },
    {
      day: "2025-10-07",
      description: "Handla",
      text: "Handla middag",
      time: "17:34",
    },
  ];

  it("renderar två tasks", () => {
    render(<Schema tasks={tasks} referenceDate={new Date("2025-10-07")} />);

    expect(screen.getByText("Träna armar på gymmet")).toBeInTheDocument();
    expect(screen.getByText("Handla middag")).toBeInTheDocument();
  });
});

describe("filter", () => {
  const tasks = [
    {
      id: 1,
      day: "2025-10-07",
      text: "Gå på bio",
      description: "Se en film",
      time: "19:00",
      category: "Kul",
    },
    {
      id: 2,
      day: "2025-10-07",
      text: "Jobbmöte",
      description: "Projektmöte med teamet",
      time: "10:00",
      category: "Jobb",
    },
    {
      id: 3,
      day: "2025-10-07",
      text: "Plugga React",
      description: "Läsa React-dokumentationen",
      time: "14:00",
      category: "Skola",
    },
  ];

  it("visar bara tasks med kategorin 'Kul' när filtret är satt till 'Kul'", () => {
    const { rerender } = render(
      <Schema
        tasks={tasks}
        filter="Alla"
        referenceDate={new Date("2025-10-07")}
      />
    );

    expect(screen.getByText("Gå på bio")).toBeInTheDocument();
    expect(screen.getByText("Jobbmöte")).toBeInTheDocument();
    expect(screen.getByText("Plugga React")).toBeInTheDocument();

    rerender(
      <Schema
        tasks={tasks}
        filter="Kul"
        referenceDate={new Date("2025-10-07")}
      />
    );

    expect(screen.getByText("Gå på bio")).toBeInTheDocument();
    expect(screen.queryByText("Jobbmöte")).not.toBeInTheDocument();
    expect(screen.queryByText("Plugga React")).not.toBeInTheDocument();
  });
});
