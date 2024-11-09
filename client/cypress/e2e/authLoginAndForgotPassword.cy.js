describe('Login Logic and Forgot Password Flow', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/login');
  });

  it('validating the login form with the wrong data', () => {
    cy.get('#email')
      .type('user@example.com')
      .should('have.value', 'user@example.com');

    cy.get('#password').type('password123').should('have.value', 'password123');

    cy.get('.button').contains('Log In').click();

    cy.get('.form-row-vertical__forgot').should('be.visible');

    cy.get('.go2072408551').contains(
      'Invalid email or password. Please, try again!'
    );
  });

  it('validating the login form with the correct data', () => {
    cy.get('#email')
      .type('thomas.schwartz.bitkingdom@gmail.com')
      .should('have.value', 'thomas.schwartz.bitkingdom@gmail.com');

    cy.get('#password').type('test1234').should('have.value', 'test1234');

    cy.get('.button').contains('Log In').click();

    cy.get('.form-row-vertical__forgot').should('be.visible');

    cy.get('.go2072408551').contains('You successfully logged in!');

    cy.url().should('include', '/dashboard');
  });

  it('validating the login form without any data', () => {
    cy.get('.button').contains('Log In').click();

    cy.get('.form-row-vertical__forgot').should('be.visible');

    cy.get(':nth-child(1) > .alert-text').contains('Email is required!');
    cy.get(':nth-child(2) > .alert-text').contains('Password is required!');
  });

  it('validating the forgot password form with the wrong email', () => {
    cy.get('.form-row-vertical__forgot').contains('Forgot password?').click();

    cy.get('.modal__content__input > .form-row-vertical > #email')
      .type('user@example.com')
      .should('have.value', 'user@example.com');

    cy.get('.send-button').contains('Send Instructions').click();

    cy.get('.go2072408551').contains('There was an error sending the email!');
  });

  it('validating the forgot password form with the correct email', () => {
    cy.get('.form-row-vertical__forgot').contains('Forgot password?').click();

    cy.get('.modal__content__input > .form-row-vertical > #email')
      .type('thomas.schwartz.bitkingdom@gmail.com')
      .should('have.value', 'thomas.schwartz.bitkingdom@gmail.com');

    cy.get('.send-button').contains('Send Instructions').click();

    cy.get('.go2072408551').contains(
      'Instructions have been sent to your inbox!'
    );
  });
});
