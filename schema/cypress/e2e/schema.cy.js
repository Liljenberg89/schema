describe("Schema-vyn", () => {
  it("visar en task i rätt dag", () => {
    cy.visit("http://localhost:5173");

    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    const todayYMD = `${yyyy}-${mm}-${dd}`;

    cy.get('input[placeholder="Titel"]').type("Handla");
    cy.get('input[placeholder="Beskrivning"]').type("Mjölk och bröd");
    cy.get('input[type="time"]').type("10:00");
    cy.get('input[type="date"]').type(todayYMD);
    cy.get("select").select("Kul");
    cy.get('button[type="submit"]').click();

    const dayName = today
      .toLocaleDateString("sv-SE", { weekday: "long" })
      .toLowerCase();

    cy.get(`[data-cy="day-${dayName}"]`).within(() => {
      cy.get('[data-cy="task"]').contains("Handla").should("exist");
    });
  });
});
