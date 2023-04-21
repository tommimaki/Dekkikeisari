describe("End-to-end tests", () => {
  beforeEach(() => {
    // Visit the homepage before each test
    cy.visit("http://localhost:3000");
  });

  it("can complete the checkout flow as a guest user", () => {
    let orderId;
    cy.intercept("POST", "/orders").as("createOrder");

    // Add a product to the cart
    cy.contains("Tutustu valikoimaan").click();
    cy.get(".product-card a").first().click();
    cy.get("#size").select(1);
    cy.get("#quantity").clear().type("1");
    cy.contains("button", "Lisää ostoskoriin").click();

    // Open cart
    cy.get("[data-testid='hamburger-menu-button']").then(($button) => {
      if ($button.is(":visible")) {
        cy.get("[data-testid='hamburger-menu-button']").click();
      }
    });
    cy.get("[data-testid='cart-button']").click();

    // Navigate to the checkout page
    cy.contains("button", "Checkout").click();
    cy.url().should("include", "/checkout");

    // Fill in shipping and payment details
    cy.get("input[placeholder='Name']").type("John Doe");
    cy.get("input[placeholder='Email']").type("john.doe@example.com");
    cy.get("input[placeholder='Address']").type("123 Main St");

    // Select a delivery method
    cy.get("input[name='delivery-option']").first().check();

    // Place the order
    cy.get("button[type='submit']").click();

    cy.contains("Tilaus Vastaanotettu!").should("be.visible");

    // Waiting for the network request and capture the response
    cy.wait("@createOrder").then((interception) => {
      const orderId = interception.response?.body?.orderId ?? null;
      console.log("Order ID:", orderId);
    });
  });
});
