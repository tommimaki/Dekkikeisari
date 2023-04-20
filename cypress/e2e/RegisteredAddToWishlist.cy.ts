//test for registered user to sign in, add product to wishlist, and view wishlist on profile page
describe("End-to-end tests", () => {
  beforeEach(() => {
    // Log in before each test
    const email = Cypress.env("TestMail");
    const password = Cypress.env("TestSalis");
    cy.visit("http://localhost:3000/signin");
    cy.get("#email").type(email);
    cy.get("#password").type(password);
    cy.get('button[type="submit"]').click();
    cy.url().should("include", "/");
  });

  it("can navigate to the product page after login", () => {
    // Find the link element with text "Tuotteet" and click on it
    cy.contains("Tutustu valikoimaan").click();
    // Verify that the URL includes "/products"
    cy.url().should("include", "/products");
  });

  it("can click on a product and see the product details page", () => {
    // Click on the link to go to the product details page
    cy.get(".product-card a").first().click();
    // Verify that the URL contains '/product/'
    cy.url().should("match", /\/products\/\d+/);
  });

  it("can add a product to the wishlist and the wishlist is updated correctly", () => {
    cy.contains("Tutustu valikoimaan").click();
    // Click on the first product on product page
    cy.get(".product-card a").first().click();

    cy.get("h3.text-4xl.text-center.font-semibold.mb-4").then(($title) => {
      const productName = $title.text().trim();
      // Add the product to the wishlist
      cy.contains("button", "Lisää toivelistalle").click();
      // Check that the product has been added to the wishlist

      //open hamburger menu if there
      cy.get("[data-testid='hamburger-menu-button']").then(($button) => {
        if ($button.is(":visible")) {
          cy.get("[data-testid='hamburger-menu-button']").click();
        }
      });

      // Navigate to the profile page
      cy.contains("Profiili").click();
      cy.url().should("include", "/profile");
      //is the product there
      cy.contains("Sinun Toivelista").click();

      // Check if the added product is in the wishlist
      cy.get("div.bg-gray-100 p")
        .filter((_index, el) => {
          return el.querySelector("strong")?.innerText === "Nimi:";
        })
        .then(($productNames) => {
          const foundProductName = $productNames
            .toArray()
            .map((el) => el.innerText.replace("Nimi:", "").trim())
            .find((name: any) => name === productName);

          expect(foundProductName).to.eq(productName);

          cy.contains("div.bg-gray-100", foundProductName)
            .parent()
            .contains("button", "poista")
            .click();

          cy.wait(500);

          cy.get("div.bg-gray-100 p").then(($remainingProductNames) => {
            if ($remainingProductNames.length > 0) {
              const remainingProductNamesArray = $remainingProductNames
                ?.filter((_index, el) => {
                  return el.querySelector("strong")?.innerText === "Nimi:";
                })
                ?.toArray()
                ?.map((el) => el.innerText.replace("Nimi:", "").trim());

              expect(remainingProductNamesArray).not.to.include(productName);
            }
          });
        });
    });
  });
});
