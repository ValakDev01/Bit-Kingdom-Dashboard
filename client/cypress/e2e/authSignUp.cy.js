describe('Sign Up Logic Flow', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/signup');
  });

  it('validating the signup form with the correct data', () => {
    cy.get('#name').type('Marco').should('have.value', 'Marco');

    cy.get('#email')
      .type('marco@example.com')
      .should('have.value', 'marco@example.com');

    cy.get('#password')
      .type('password1234D@')
      .should('have.value', 'password1234D@');

    cy.get('#passwordConfirm')
      .type('password1234D@')
      .should('have.value', 'password1234D@');

    cy.get('#gender').select('Male');

    cy.get('.button').contains('Sign Up').click();

    cy.url().should('include', '/dashboard');

    cy.get('.go2072408551').contains(
      'Your account has been created successfully!'
    );

    cy.get('.nav-list > :nth-child(2)').should('be.visible');
    cy.get('.nav-list > :nth-child(4)').should('be.visible');
    cy.get('.nav-list > :nth-child(5)').should('be.visible');
    cy.get('.logout-link').should('be.visible');

    cy.get('.avatar').should('be.visible');
    cy.get('.user-avatar > span').should('be.visible');
    cy.get('.main-list').should('be.visible');
  });

  it('validating the signup form with the wrong data', () => {
    cy.get('.button').contains('Sign Up').click();

    cy.url().should('include', '/signup');

    cy.get('.form > :nth-child(1) > .alert-text').contains('Name is required!');

    cy.get(':nth-child(2) > .alert-text').contains('Email is required!');

    cy.get(':nth-child(3) > .alert-text').contains('Password is required!');

    cy.get(':nth-child(4) > .alert-text').contains(
      'Confirm password is required!'
    );

    cy.get('.form-row-inline > :nth-child(1) > .alert-text').contains(
      'Gender is required!'
    );
  });
});
