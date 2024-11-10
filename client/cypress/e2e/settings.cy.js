describe('Settings Section', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/login');

    cy.get('#email')
      .type('thomas.schwartz.bitkingdom@gmail.com')
      .should('have.value', 'thomas.schwartz.bitkingdom@gmail.com');

    cy.get('#password').type('test1234').should('have.value', 'test1234');
    cy.get('.button').contains('Log In').click();

    cy.get('.go2072408551').contains('You successfully logged in!');
    cy.url().should('include', '/dashboard');

    cy.get(':nth-child(5) > .nav-link').contains('Settings').click();
    cy.url().should('include', '/settings');
  });

  it('Results Per Page select', () => {
    cy.get('#resultsPerPage').should('have.value', 10);

    cy.get('#resultsPerPage').select('20');

    cy.get('#resultsPerPage').should('have.value', 20);

    cy.get('.go2072408551').contains('Your settings have been updated!');
  });

  it('Currency Display Format select', () => {
    cy.get('#currencyDisplayFormat').should('have.value', 'USD');

    cy.get('#currencyDisplayFormat').select('EUR');

    cy.get('#currencyDisplayFormat').should('have.value', 'EUR');

    cy.get('.go2072408551').contains('Your settings have been updated!');
  });

  it('Mode select', () => {
    cy.get('#defaultAppTheme').should('have.value', 'light');

    cy.get('#defaultAppTheme').select('dark');

    cy.get('#defaultAppTheme').should('have.value', 'dark');

    cy.get('.go2072408551').contains('Your settings have been updated!');
  });
});
