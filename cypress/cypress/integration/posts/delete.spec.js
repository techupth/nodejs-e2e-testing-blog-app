/// <reference types="cypress" />

it("user should be able to delete successfully", () => {
  // Given
  const user = buildUser();

  cy.visit("http://localhost:3000/login")
    .viewport(1500, 660)
    .request({
      url: "http://localhost:4000/auth/register",
      method: "POST",
      body: user,
    })
    .login(user.username, user.password);

  // When

  // Then
});
