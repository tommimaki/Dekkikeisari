/// <reference types="cypress" />

context("Navigation", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("can navigate to the product page after login", () => {
    cy.contains("Tutustu valikoimaan").click();
    cy.url().should("include", "/products");
  });

  it("can click on a product and see the product details page", () => {
    cy.contains("Tutustu valikoimaan").click();
    cy.get(".product-card a").first().click();
    cy.url().should("match", /\/products\/\d+/);
  });

  it("cy.go() - go back or forward in the browser's history", () => {
    cy.contains("Tutustu valikoimaan").click();
    cy.url().should("include", "/products");

    cy.go("back");
    cy.url().should("include", "/");

    cy.go("forward");
    cy.url().should("include", "/products");

    // clicking back
    cy.go(-1);
    cy.url().should("include", "/");

    // clicking forward
    cy.go(1);
    cy.url().should("include", "/products");
  });

  it("cy.reload() - reload the page", () => {
    cy.reload();

    // reload the page without using the cache
    cy.reload(true);
  });

  it("cy.visit() - visit a remote url", () => {
    cy.visit("http://localhost:3000/products", {
      timeout: 50000, // increase total time for the visit to resolve
      onBeforeLoad(contentWindow) {
        // contentWindow is the remote page's window object
        expect(typeof contentWindow === "object").to.be.true;
      },
      onLoad(contentWindow) {
        // contentWindow is the remote page's window object
        expect(typeof contentWindow === "object").to.be.true;
      },
    });
  });
});
