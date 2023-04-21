describe("LoginLogout", () => {
  it("can log in with valid credentials", () => {
    //login
    const email = Cypress.env("TestMail");
    const password = Cypress.env("TestSalis");
    cy.visit("http://localhost:3000/signin");
    cy.get("#email").type(email);
    cy.get("#password").type(password);
    cy.get('button[type="submit"]').click();

    // checking that user is logged in
    cy.window().its("localStorage.token").should("exist");
    cy.window().then((win) => {
      const token = win.localStorage.token;
      cy.log(`Login successful: ${token}`);
    });

    //logging out
    cy.get("[data-testid='hamburger-menu-button']").then(($button) => {
      if ($button.is(":visible")) {
        cy.get("[data-testid='hamburger-menu-button']").click();
      }
    });

    cy.contains("Kirjaudu ulos").click();
    // checking that user is logged out
    cy.window().its("localStorage.token").should("not.exist");
    cy.log("Logout successful");
  });

  it("shows an error message for failed login attempt", () => {
    //login with invalid credentials
    cy.visit("http://localhost:3000/signin");
    cy.get("#email").type("invalid_email@example.com");
    cy.get("#password").type("invalid_password");
    cy.get('button[type="submit"]').click();

    // checking that user is not logged in and sees error message
    cy.window().its("localStorage.token").should("not.exist");
    cy.contains("Invalid email or password").should("be.visible");
    cy.log("Failed login attempt: Invalid email or password");
  });
});
