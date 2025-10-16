describe("ToDo-vyn", () => {
  it("lägger till en task i listan", () => {
    cy.visit("http://localhost:5173");

    cy.get('input[placeholder="Titel"]').type("Test");
    cy.get('input[placeholder="Beskrivning"]').type("Beskrivning");
    cy.get('input[type="time"]').type("12:00");
    cy.get('input[type="date"]').type("2025-10-06");
    cy.get("select").select("Jobb");
    cy.get('button[type="submit"]').click();

    cy.contains("Test").should("exist");
    cy.contains("Beskrivning").should("exist");
  });

  it("lägger inte till en task om något fält saknas", () => {
    cy.visit("http://localhost:5173");

    cy.get('input[placeholder="Titel"]').clear();
    cy.get('input[placeholder="Beskrivning"]').type("Saknar titel");
    cy.get('input[type="time"]').type("12:00");
    cy.get('input[type="date"]').type("2025-10-06");
    cy.get("select").select("Jobb");
    cy.get('button[type="submit"]').click();

    cy.contains("Saknar titel").should("not.exist");
  });

  it("filtrerar tasks efter kategori", () => {
    cy.visit("http://localhost:5173");

    // Task 1: Kul
    cy.get('input[placeholder="Titel"]').type("Bio");
    cy.get('input[placeholder="Beskrivning"]').type("Se film");
    cy.get('input[type="time"]').type("19:00");
    cy.get('input[type="date"]').type("2025-10-09");
    cy.get("select").select("Kul");
    cy.get('button[type="submit"]').click();

    // Task 2: Jobb
    cy.get('input[placeholder="Titel"]').type("Möte");
    cy.get('input[placeholder="Beskrivning"]').type("Teamprojekt");
    cy.get('input[type="time"]').type("10:00");
    cy.get('input[type="date"]').type("2025-10-09");
    cy.get("select").select("Jobb");
    cy.get('button[type="submit"]').click();

    cy.contains("Bio").should("exist");
    cy.contains("Möte").should("exist");
    cy.get('[data-cy="filter-Kul"]').click();

    cy.contains("Bio").should("exist");
    cy.contains("Möte").should("not.exist");
  });
});
