describe('App running normal', () => {
  it('Home page opened', () => {
    cy.visit('/');
    cy.getBySel('h1-title').should('exist');
  });

  it('Routing ok', () => {
    cy.visit('/');
    cy.getBySelLike('menu-link-').each((link) => {
      cy.request(link.prop('href')).its('status').should('eq', 200);
    });
  });
});
