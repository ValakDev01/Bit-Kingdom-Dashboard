describe('Initial Dashboard for Unauthenticated User', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/dashboard');
  });

  it('should contain /dashboard endpoint in URL', () => {
    cy.url().should('include', '/dashboard');
  });

  it('should display Log In and Sign Up buttons', () => {
    cy.get(':nth-child(1) > .button')
      .should('be.visible')
      .and('have.text', 'Log In');
    cy.get(':nth-child(2) > .button')
      .should('be.visible')
      .and('have.text', 'Sign Up');
  });

  it('should display Dashboard and Crypto links in the menu', () => {
    cy.get(':nth-child(1) > .nav-link')
      .should('be.visible')
      .and('have.text', 'Dashboard');
    cy.get(':nth-child(2) > .nav-link')
      .should('be.visible')
      .and('have.text', 'Crypto');
  });

  it('should display the logo', () => {
    cy.get('.logo-image').should('be.visible');
  });

  it('should display 4 crypto charts', () => {
    cy.get('.tradingview-widget-container__widget > div > iframe').should(
      'be.visible'
    );
    cy.get('.nested-block-2 > .tradingview-widget-container > iframe').should(
      'be.visible'
    );
    cy.get('.nested-block-3 > .tradingview-widget-container > iframe').should(
      'be.visible'
    );
    cy.get('.nested-block-4 > .tradingview-widget-container > iframe').should(
      'be.visible'
    );
  });

  it('should show Spinner on Log In click and redirect to /login with login form', () => {
    cy.get(':nth-child(1) > .button').click();

    cy.get('.spinner').should('be.visible');

    cy.url().should('include', '/login');

    cy.get('.form-row-vertical__forgot').should('be.visible');

    cy.get('.form').should('be.visible');
  });

  it('should show Spinner on Sign Up click and redirect to /signup with signup form', () => {
    cy.get(':nth-child(2) > .button').click();

    cy.get('.spinner').should('be.visible');

    cy.url().should('include', '/signup');

    cy.get('.form').should('be.visible');
  });
});
