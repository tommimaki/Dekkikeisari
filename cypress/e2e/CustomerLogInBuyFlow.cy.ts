//test for registered user to sign in, add product to cart, checkout and view the order on profile page
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

  it("can add a product to the cart and the cart is updated correctly", () => {
    cy.contains("Tutustu valikoimaan").click();
    // Click on the first product on product page
    cy.get(".product-card a").first().click();
    // Select the first available size from the options
    cy.get("#size").select(1);
    // Set the quantity to 1
    cy.get("#quantity").clear().type("1");
    // Add the product to the cart
    cy.contains("button", "Lisää ostoskoriin").click();
    //check cart items to be 1
    cy.get('[data-testid="cart-counter"]').should("have.text", "(1)");
  });

  it("can complete the checkout flow", () => {
    let orderId;
    cy.intercept("POST", "/orders").as("createOrder");
    //     // Add a product to the cart
    cy.contains("Tutustu valikoimaan").click();
    cy.get(".product-card a").first().click();
    cy.get("#size").select(1);
    cy.get("#quantity").clear().type("1");
    cy.contains("button", "Lisää ostoskoriin").click();

    // open cart
    //open hamburger menu if testing in small screen
    cy.get("[data-testid='hamburger-menu-button']").then(($button) => {
      if ($button.is(":visible")) {
        // Open the hamburger menu
        cy.get("[data-testid='hamburger-menu-button']").click();
      }
    });
    cy.get("[data-testid='cart-button']").click();

    // Navigate to the checkout page
    cy.contains("button", "Checkout").click();
    cy.url().should("include", "/checkout");

    // Fill in shipping and payment details
    //info prefilled for customer logged in and saved data
    // cy.get("input[placeholder='Name']").type("John Doe");
    // cy.get("input[placeholder='Email']").type("john.doe@example.com");
    // cy.get("input[placeholder='Address']").type("123 Main St");

    // Select a delivery method
    cy.get("input[name='delivery-option']").first().check();

    // Place the order
    cy.get("button[type='submit']").click();

    cy.contains("Tilaus Vastaanotettu!").should("be.visible");

    // Waiting for the network request and capture the response
    cy.wait("@createOrder").then((interception) => {
      const orderId = interception.response?.body?.orderId ?? null;
      console.log("Order ID:", orderId);

      cy.get("[data-testid='hamburger-menu-button']").then(($button) => {
        if ($button.is(":visible")) {
          cy.get("[data-testid='hamburger-menu-button']").click();
        }
      });

      // Navigate to the profile page
      cy.contains("Profiili").click();
      cy.url().should("include", "/profile");

      cy.get(`li:contains('Tilaus ID: ${orderId}')`).should(
        "contain",
        `Tilaus ID: ${orderId}`
      );
    });
  });
});
