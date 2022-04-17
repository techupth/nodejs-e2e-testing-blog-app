Cypress.Commands.add("login", (username, password) => {
  cy.get("#username")
    .type(username)
    .get("#password")
    .type(password)
    .get(".login-button")
    .click();
});
