/// <reference types="cypress" />

import { buildUser, buildPost } from "../../support/generate";

it("user should be able to create post successfully ", () => {
  // Given
  const user = buildUser();
  const post = buildPost();

  cy.visit("http://localhost:3000/login")
    .viewport(1500, 660)
    .request({
      url: "http://localhost:4000/auth/register",
      method: "POST",
      body: user,
    })
    .login(user.username, user.password);

  // When
  cy.get(".app-wrapper > :nth-child(2)")
    .click()
    .get("#title")
    .type(post.title)
    .get("#content")
    .type(post.content)
    .get("#status")
    .select(post.status)
    .get(".form-actions > button")
    .click();

  // Then
  cy.url()
    .should("eq", "http://localhost:3000/")
    .get(".board")
    .contains(post.title);
});
