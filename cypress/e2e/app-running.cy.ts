import { ROUTE } from '#shared/config';

beforeEach(() => {
  cy.visit(ROUTE.HOME);
});

describe('app running', () => {
  it('should open Home page', () => {
    cy.getBySel('h1-title').should('exist');
  });

  it('opens links from Home page', () => {
    cy.getBySelLike('menu-link-').each((link) => {
      cy.request(link.prop('href')).its('status').should('eq', 200);
    });
  });
});
