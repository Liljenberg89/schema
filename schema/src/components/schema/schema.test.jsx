import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Schema from "./schema";

describe("Kollar om alla dagar visas", () => {
  it("visar texten rätt dagar", () => {
    render(<Schema />);

    expect(screen.getByText("Måndag")).toBeInTheDocument();
    expect(screen.getByText("Fredag")).toBeInTheDocument();
    expect(screen.getByText("Söndag")).toBeInTheDocument();
  });
});

describe("kollar om tasks visas", () => {
  const tasks = [
    {
      day: "2025-10-03",
      description: "Städa",
      text: "Träna armar på gymmet",
      time: "18:34",
    },
  ];

  it("kollar om tasks renderas", () => {
    render(<Schema tasks={tasks} />);

    expect(screen.getByText("Städa")).toBeInTheDocument();
  });
});
