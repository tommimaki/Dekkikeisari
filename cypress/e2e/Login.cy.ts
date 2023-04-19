describe("Login", () => {
  it("can log in with valid credentials", () => {
    const email = "cypress@mail.com";
    const password = "Salis123";
    cy.visit("http://localhost:3000/signin");
    cy.get("#email").type(email);
    cy.get("#password").type(password);
    cy.get('button[type="submit"]').click();
    cy.url().should("include", "/");
  });
});
