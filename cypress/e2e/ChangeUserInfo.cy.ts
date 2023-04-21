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
      const oldAddress = $address.val() as string;
      const regex = /(\d+)(?!.*\d)/;
      const updatedAddress = oldAddress?.replace(regex, (match: string) => {
        return (parseInt(match) + 1).toString();
      });

      // Clear the old address value and type the updated address
      cy.get("#address").clear().type(updatedAddress);

      // Save the changes
      cy.contains("button", "Tallenna muutokset").click();

      //waiting for dom to update the address
      cy.wait(1000);

      // Check if the address has been updated correctly
      cy.contains(updatedAddress).should(($newAddress) => {
        const newAddressElement = $newAddress as unknown as JQuery;
        const newAddressText = newAddressElement
          .text()
          .replace("Osoite:", "")
          .trim();
        expect(newAddressText).to.equal(updatedAddress);
      });
    });
  });

  it("can navigate to the profile page, update name, and verify the change", () => {
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

    // Find the name input and append an extra letter to the current name
    // cy.get("#name").then(($name) => {
    //   const oldName = $name.val();
    //   const updatedName = oldName + "a";
    cy.get("#name").then(($name) => {
      const oldName = $name.val() as string;
      // Generate a random letter
      const randomLetter = String.fromCharCode(
        97 + Math.floor(Math.random() * 26)
      );
      const updatedName = oldName?.slice(0, -1) + randomLetter; // Remove the last letter and add the random letter

      // Clear the old name value and type the updated name
      cy.get("#name").clear().type(updatedName);

      // Save the changes
      cy.contains("button", "Tallenna muutokset").click();

      // Waiting for the DOM to update the name
      cy.wait(1000);

      // Check if the name has been updated correctly
      // Check if the name has been updated correctly
      cy.contains("Nimi:")
        .parent()
        .should(($newName) => {
          const newNameText = $newName.text().replace("Nimi:", "").trim();
          expect(newNameText).to.equal(updatedName);
        });
    });
  });
});
