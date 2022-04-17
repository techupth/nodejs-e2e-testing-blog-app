/// <reference types="cypress" />

import { buildUser } from "../../support/generate";

it("user should login successfully", () => {
  const user = buildUser();
  cy.visit("http://localhost:3000/login")
    .viewport(1500, 660)
    .request({
      url: "http://localhost:4000/auth/register",
      method: "POST",
      body: user,
    })
    .login(user.username, user.password)
    .get(".board")
    .children()
    .should("have.length", 2)
    .url()
    .should("eq", "http://localhost:3000/");
});

it("user should not be able to login if has wrong username", () => {
  cy.visit("http://localhost:3000/login")
    .viewport(1500, 660)
    .login("invalid-username", "valid-password")
    .url()
    .should("eq", "http://localhost:3000/login")
    .get(".error-message")
    .should("exist")
    .should("have.text", "Error: user not found");
});

it("user should not be able to login if has wrong password", () => {
  cy.visit("http://localhost:3000/login")
    .viewport(1500, 660)
    .login("jamestechup", "invalid-password")
    .url()
    .should("eq", "http://localhost:3000/login")
    .get(".error-message")
    .should("exist")
    .should("have.text", "Error: password not valid");
});
