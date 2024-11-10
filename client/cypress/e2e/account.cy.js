describe('Account Section', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/login');
  });

  it('should allow the user to update his name', () => {
    cy.get('#email')
      .type('thomas.schwartz.bitkingdom@gmail.com')
      .should('have.value', 'thomas.schwartz.bitkingdom@gmail.com');

    cy.get('#password').type('test1234').should('have.value', 'test1234');
    cy.get('.button').contains('Log In').click();

    cy.get('.go2072408551').contains('You successfully logged in!');
    cy.url().should('include', '/dashboard');

    cy.get(':nth-child(2) > .nav-link').contains('Account').click();
    cy.url().should('include', '/account');

    cy.get('.user-avatar > span').contains('Thomas');

    cy.get(':nth-child(2) > #fullName')
      .type('Marco')
      .should('have.value', 'Marco');

    cy.get(':nth-child(2) > .form > :nth-child(4) > .primary')
      .contains('Update account')
      .click();

    cy.get('.go2072408551').contains('Your profile has been updated!');

    cy.get('.user-avatar > span').contains('Marco');
  });

  it('should allow the user to change his password', () => {
    cy.get('#email')
      .type('thomas.schwartz.bitkingdom@gmail.com')
      .should('have.value', 'thomas.schwartz.bitkingdom@gmail.com');

    cy.get('#password').type('test1234').should('have.value', 'test1234');
    cy.get('.button').contains('Log In').click();

    cy.get('.go2072408551').contains('You successfully logged in!');
    cy.url().should('include', '/dashboard');

    cy.get(':nth-child(2) > .nav-link').contains('Account').click();
    cy.url().should('include', '/account');

    cy.get(':nth-child(3) > .form > :nth-child(1) > #password')
      .type('test1234')
      .should('have.value', 'test1234');

    cy.get(':nth-child(2) > #password')
      .type('test1234D@')
      .should('have.value', 'test1234D@');

    cy.get(':nth-child(3) > #passwordConfirm')
      .type('test1234D@')
      .should('have.value', 'test1234D@');

    cy.get(':nth-child(3) > .form > :nth-child(4) > .primary')
      .contains('Update account')
      .click();

    cy.get('.go2072408551').contains('Your password has been updated!');

    cy.url().should('include', '/dashboard');
  });

  it('should allow the user to delete his account', () => {
    cy.get('#email')
      .type('thomas.schwartz.bitkingdom@gmail.com')
      .should('have.value', 'thomas.schwartz.bitkingdom@gmail.com');

    cy.get('#password').type('test1234D@').should('have.value', 'test1234D@');
    cy.get('.button').contains('Log In').click();

    cy.get('.go2072408551').contains('You successfully logged in!');
    cy.url().should('include', '/dashboard');

    cy.get(':nth-child(2) > .nav-link').contains('Account').click();
    cy.url().should('include', '/account');

    cy.get(':nth-child(4) > .form > :nth-child(1) > #password')
      .type('test1234D@')
      .should('have.value', 'test1234D@');

    cy.get(':nth-child(2) > #passwordConfirm')
      .type('test1234D@')
      .should('have.value', 'test1234D@');

    cy.get(':nth-child(3) > #fullName')
      .type('DELETE MY ACCOUNT')
      .should('have.value', 'DELETE MY ACCOUNT');

    cy.get('.danger').contains('Delete account').click();

    cy.get('.go2072408551').contains('Your account has been deleted!');

    cy.url().should('include', '/dashboard');
  });
});
