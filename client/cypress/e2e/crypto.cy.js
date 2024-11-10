// describe('Account Section', () => {
//     it('should select Canada from the dropdown and verify the selection', () => {
//       cy.visit('http://localhost:5173/login');

//       cy.get('#email')
//         .type('thomas.schwartz.bitkingdom@gmail.com')
//         .should('have.value', 'thomas.schwartz.bitkingdom@gmail.com');

//       cy.get('#password').type('test1234').should('have.value', 'test1234');
//       cy.get('.button').contains('Log In').click();

//       cy.get('.go2072408551').contains('You successfully logged in!');
//       cy.url().should('include', '/dashboard');

//       cy.get('.logout-link').contains('Log Out').click();

//       cy.get('.go2072408551').contains('You have successfully logged out!');

//       cy.get('.spinner').should('be.visible');

//       cy.url().should('include', '/dashboard');
//     });
//   });
