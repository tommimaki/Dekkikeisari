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

  //   it("can complete the checkout flow", () => {
  //     // Add a product to the cart
  cy.contains("Tutustu valikoimaan").click();
  cy.get(".product-card a").first().click();
  cy.get("#size").select(1);
  cy.get("#quantity").clear().type("1");
  cy.contains("button", "Lisää ostoskoriin").click();

  // Navigate to the checkout page
  //     cy.get("#checkout-link").click();
  //     cy.url().should("include", "/checkout");

  //     // Fill in shipping and payment details
  //     // Replace the selectors with those that match your application
  //     cy.get("#shipping-name").type("John Doe");
  //     cy.get("#shipping-address").type("123 Main St");
  //     cy.get("#payment-method").select("Credit Card");
  //     cy.get("#card-number").type("4111111111111111");
  //     cy.get("#card-expiration").type("12/24");
  //     cy.get("#card-cvv").type("123");

  //     // Place the order
  //     cy.get("#place-order-button").click();
  //     cy.url().should("include", "/order-confirmation");
  //   });

  //   it("can view the order details in their profile after placing an order", () => {
  // Complete the checkout process (as in the previous test)

  // // Navigate to the user profile page
  // cy.get("#user-profile-link").click();
  // cy.url().should("include", "/profile");

  // // Check if the order is displayed in the user's order history
  // cy.get(".order-item").its("length").should("be.gte", 1);
  //   });
});
