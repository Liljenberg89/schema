import { render, screen, fireEvent } from "@testing-library/react";
import ToDo from "./toDo";

describe("toDo Component", () => {
  test("renders title", () => {
    render(<ToDo />);
    expect(screen.getByText(/To-Do List/i)).toBeInTheDocument();
  });

  test("can add a new task", () => {
    render(<ToDo />);

    const titleInput = screen.getByPlaceholderText("Titel");
    const descriptionInput = screen.getByPlaceholderText("Beskrivning");
    const timeInput = screen.getByLabelText(/time/i);
    const dayInput = screen.getByLabelText(/date/i);
    const addButton = screen.getByText("Lägg till");

    fireEvent.change(titleInput, { target: { value: "Handla" } });
    fireEvent.change(descriptionInput, {
      target: { value: "Köpa mjölk och bröd" },
    });
    fireEvent.change(timeInput, { target: { value: "10:30" } });
    fireEvent.change(dayInput, { target: { value: "2025-10-01" } });

    fireEvent.click(addButton);

    expect(screen.getByText(/Handla/)).toBeInTheDocument();
    expect(screen.getByText(/Köpa mjölk och bröd/)).toBeInTheDocument();
    expect(screen.getByText(/10:30/)).toBeInTheDocument();
    expect(screen.getByText(/2025-10-01/)).toBeInTheDocument();
  });

  test("can toggle task as done", () => {
    render(<ToDo />);

    const titleInput = screen.getByPlaceholderText("Titel");
    const descriptionInput = screen.getByPlaceholderText("Beskrivning");
    const timeInput = screen.getByLabelText(/time/i);
    const dayInput = screen.getByLabelText(/date/i);
    const addButton = screen.getByText("Lägg till");

    fireEvent.change(titleInput, { target: { value: "Träna" } });
    fireEvent.change(descriptionInput, { target: { value: "Gympass" } });
    fireEvent.change(timeInput, { target: { value: "18:00" } });
    fireEvent.change(dayInput, { target: { value: "2025-10-02" } });

    fireEvent.click(addButton);

    const task = screen.getByText(/Träna/);
    expect(task).toBeInTheDocument();

    fireEvent.click(task);

    expect(task).toHaveStyle("text-decoration: line-through");
  });

  test("can delete a task", () => {
    render(<ToDo />);

    const titleInput = screen.getByPlaceholderText("Titel");
    const descriptionInput = screen.getByPlaceholderText("Beskrivning");
    const timeInput = screen.getByLabelText(/time/i);
    const dayInput = screen.getByLabelText(/date/i);
    const addButton = screen.getByText("Lägg till");

    fireEvent.change(titleInput, { target: { value: "Laga mat" } });
    fireEvent.change(descriptionInput, { target: { value: "Pasta med sås" } });
    fireEvent.change(timeInput, { target: { value: "12:00" } });
    fireEvent.change(dayInput, { target: { value: "2025-10-03" } });

    fireEvent.click(addButton);

    expect(screen.getByText(/Laga mat/)).toBeInTheDocument();

    const deleteButton = screen.getByText("❌");
    fireEvent.click(deleteButton);

    expect(screen.queryByText(/Laga mat/)).not.toBeInTheDocument();
  });
});
