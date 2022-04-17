/// <reference types="cypress" />

import { buildUser } from "../../support/generate";

it("user should login successfully", () => {
  const user = buildUser();
  cy.visit("http://localhost:3000/login").viewport(1500, 660);
  cy.request({
    url: "http://localhost:4000/auth/register",
    method: "POST",
    body: user,
  });
  cy.get("#username").type(user.username);
  cy.get("#password").type(user.password);
  cy.get(".login-button").click();
  cy.get(".board").children().should("have.length", 2);
  cy.url().should("eq", "http://localhost:3000/");
});

it("user should not be able to login if has wrong username", () => {
  cy.visit("http://localhost:3000/login").viewport(1500, 660);
  cy.get("#username")
    .type("invalid-username")
    .get("#password")
    .type("valid-password")
    .get(".login-button")
    .click()
    .url()
    .should("eq", "http://localhost:3000/login")
    .get(".error-message")
    .should("exist")
    .should("have.text", "Error: user not found");
});

it("user should not be able to login if has wrong password", () => {
  cy.visit("http://localhost:3000/login").viewport(1500, 660);
  cy.get("#username")
    .type("jamestechup")
    .get("#password")
    .type("1321421421")
    .get(".login-button")
    .click()
    .get(".error-message")
    .should("exist")
    .should("have.text", "Error: password not valid");
});
