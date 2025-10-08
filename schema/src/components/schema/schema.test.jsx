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
    render(<Schema tasks={tasks} />);

    expect(screen.getByText("Städa")).toBeInTheDocument();
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
    render(<Schema tasks={tasks} />);

    expect(screen.getByText("Städa")).toBeInTheDocument();
    expect(screen.getByText("Handla")).toBeInTheDocument();
  });
});

// describe("kollar om nästa vecka visas", () => {
//   const tasks = [
//     {
//       day: "2025-10-14",
//       description: "Städa",
//       text: "Träna armar på gymmet",
//       time: "18:34",
//     },
//   ];

//   it("renderar schema", () => {
//     render(<Schema tasks={tasks} />);

//     const knapp = screen.getByText("Senare");

//     fireEvent.click(knapp[0]);

//     expect(screen.getByText("Städa")).toBeInTheDocument();
//   });
// });
