describe('Crypto Section', () => {
  it('should display the crypto table with the data coming from API', () => {
    cy.visit('http://localhost:5173/login');

    cy.get('#email')
      .type('thomas.schwartz.bitkingdom@gmail.com')
      .should('have.value', 'thomas.schwartz.bitkingdom@gmail.com');

    cy.get('#password').type('test1234').should('have.value', 'test1234');
    cy.get('.button').contains('Log In').click();

    cy.get('.go2072408551').contains('You successfully logged in!');
    cy.url().should('include', '/dashboard');

    cy.get(':nth-child(3) > .nav-link').contains('Crypto').click();
    cy.url().should('include', '/cryptos');

    cy.get('.crypto-table').should('be.visible');
    cy.get('.filter').should('be.visible');
    cy.get('.styled-select').should('be.visible');

    cy.get(
      ':nth-child(3) > :nth-child(10) > #long-button > [data-testid="MoreVertIcon"]'
    ).click();

    cy.get('.MuiList-root > [tabindex="0"]').contains('See Details').click();

    cy.url().should('include', '/cryptos/');
  });

  it('should return a list of cryptocurrencies with correct data structure', () => {
    cy.request('http://localhost:5000/api/v1/crypto').then(response => {
      expect(response.status).to.eq(200);

      expect(response.body.status).to.eq('OK');

      expect(response.body.totalCount).to.be.a('number');
      expect(response.body.totalCount).to.eq(100);

      expect(response.body.data).to.be.an('array');
      expect(response.body.data.length).to.eq(100);
    });
  });
});
