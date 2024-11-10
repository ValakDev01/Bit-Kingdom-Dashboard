describe('Watchlist Section', () => {
  it('should display the crypto table with the data coming from API', () => {
    cy.visit('http://localhost:5173/login');

    cy.get('#email')
      .type('thomas.schwartz.bitkingdom@gmail.com')
      .should('have.value', 'thomas.schwartz.bitkingdom@gmail.com');

    cy.get('#password').type('test1234').should('have.value', 'test1234');
    cy.get('.button').contains('Log In').click();

    cy.get('.go2072408551').contains('You successfully logged in!');
    cy.url().should('include', '/dashboard');

    cy.get(':nth-child(4) > .nav-link').contains('Watchlist').click();
    cy.url().should('include', '/watchlist');

    cy.get('.crypto-table-watchlist').should('be.visible');

    cy.get(
      ':nth-child(3) > :nth-child(10) > #long-button > [data-testid="MoreVertIcon"]'
    ).click();

    cy.get('.MuiList-root > [tabindex="0"]')
      .contains('See Details')
      .should('be.visible');
    cy.get('.MuiList-root > [tabindex="-1"]')
      .contains('Remove from Watchlist')
      .should('be.visible');

    cy.get('.MuiList-root > [tabindex="-1"]').click();

    cy.get('.modal').should('be.visible');
  });

  it('should display details about concrete crypto', () => {
    cy.visit('http://localhost:5173/login');

    cy.get('#email')
      .type('thomas.schwartz.bitkingdom@gmail.com')
      .should('have.value', 'thomas.schwartz.bitkingdom@gmail.com');

    cy.get('#password').type('test1234').should('have.value', 'test1234');
    cy.get('.button').contains('Log In').click();

    cy.get('.go2072408551').contains('You successfully logged in!');
    cy.url().should('include', '/dashboard');

    cy.get(':nth-child(4) > .nav-link').contains('Watchlist').click();
    cy.url().should('include', '/watchlist');

    cy.get(
      ':nth-child(3) > :nth-child(10) > #long-button > [data-testid="MoreVertIcon"]'
    ).click();

    cy.get('.MuiList-root > [tabindex="0"]').contains('See Details').click();

    cy.url().should('include', '/cryptos/');
  });
});
