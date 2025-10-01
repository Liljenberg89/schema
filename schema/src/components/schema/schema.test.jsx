import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Schema from "./schema";

describe("Simple passing test", () => {
  it("should always pass", () => {
    expect(true).toBe(true);
  });
});

describe("Måndag", () => {
  it("visar texten Måndag", () => {
    render(<Schema />);

    expect(screen.getByText("Måndag")).toBeInTheDocument();
  });
});
