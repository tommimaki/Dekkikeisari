describe("End-to-end tests", () => {
  //test for changing user's address

  beforeEach(() => {
    // Log in before each test
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
  });

  it("can navigate to the profile page, update address, and verify the change", () => {
    cy.get("[data-testid='hamburger-menu-button']").then(($button) => {
      if ($button.is(":visible")) {
        cy.get("[data-testid='hamburger-menu-button']").click();
      }
    });
    // Navigating to the profile page
    cy.contains("Profiili").click();
    cy.url().should("include", "/profile");

    // Click the "Muokkaa profiilia" button
    cy.contains("Muokkaa profiilia").click();

    // Find the address input and increment the street number by one
    cy.get("#address").then(($address) => {
      const oldAddress = $address.val();
      const regex = /(\d+)(?!.*\d)/;
      const updatedAddress = oldAddress?.replace(regex, (match) => {
        return parseInt(match) + 1;
      });

      // Clear the old address value and type the updated address
      cy.get("#address").clear().type(updatedAddress);

      // Save the changes
      cy.contains("button", "Tallenna muutokset").click();

      //waiting for dom to update the address
      cy.wait(1000);

      // Check if the address has been updated correctly
      cy.contains(updatedAddress).should(($newAddress) => {
        const newAddressText = $newAddress
          ?.text()
          .replace("Osoite:", "")
          .trim();
        expect(newAddressText).to.equal(updatedAddress);
      });
    });
  });
});
