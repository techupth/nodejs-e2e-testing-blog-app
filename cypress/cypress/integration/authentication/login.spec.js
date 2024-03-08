/// <reference types="cypress" />

import { buildUser } from "../../support/generate";

it("user should login successfully", () => {
  // test steps
  // 1) register
  const user = buildUser();
  cy.request({
    url: "http://localhost:4000/auth/register",
    method: "POST",
    body: user,
  });

  // 2) เข้าไปที่หน้าเว็บไซต์ แล้วก็กรอกข้อมูล
  cy.visit("http://localhost:3000/login").viewport(1500, 660);
  cy.get("#username").type(user.username);
  cy.get("#password").type(user.password);

  // 3) click ปุ่ม login
  cy.get(".login-button").click();

  // expected result: เว็บไซต์ Redirect ไปที่ Homepage
  cy.url().should("eq", "http://localhost:3000/");
  cy.get(".board").children().should("have.length", 2);
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
  const user = buildUser();
  cy.visit("http://localhost:3000/login").viewport(1500, 660);
  cy.request({
    url: "http://localhost:4000/auth/register",
    method: "POST",
    body: user,
  });

  cy.get("#username")
    .type(user.username)
    .get("#password")
    .type("invalid-password")
    .get(".login-button")
    .click()
    .get(".error-message")
    .should("exist")
    .should("have.text", "Error: password not valid");
});
