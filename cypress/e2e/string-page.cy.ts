import { DELAY_IN_MS } from '#shared/constants';
import { CircleState } from 'cypress/support/types';

const states: CircleState[] = [
  {
    color: ['default', 'default', 'default', 'default', 'default'],
    value: ['h', 'e', 'l', 'l', 'o'],
  },
  {
    color: ['changing', 'default', 'default', 'default', 'changing'],
    value: ['h', 'e', 'l', 'l', 'o'],
  },
  {
    color: ['modified', 'changing', 'default', 'changing', 'modified'],
    value: ['o', 'e', 'l', 'l', 'h'],
  },
  {
    color: ['modified', 'modified', 'changing', 'modified', 'modified'],
    value: ['o', 'l', 'l', 'e', 'h'],
  },
  {
    color: ['modified', 'modified', 'modified', 'modified', 'modified'],
    value: ['o', 'l', 'l', 'e', 'h'],
  },
];

describe('Reverse String page', () => {
  const text = 'hello';

  beforeEach(() => {
    cy.visit('/#/recursion');
    cy.getBySel('reverse-btn').as('reverseBtn');
    cy.getBySel('input').should('be.empty').as('input');
  });

  afterEach(() => {
    cy.get('@input').clear();
    cy.get('@input').should('be.empty');
  });

  it('button disabled w/ empty input & vice versa', () => {
    cy.checkButton({ button: 'reverseBtn', input: 'input', inputValue: text });
  });

  it('animation correct', () => {
    cy.get('@input').type(text);
    cy.get('@reverseBtn').click();
    cy.getBySelLike('circle-').should('have.length', text.length).as('circles');

    states.forEach((state) => {
      cy.checkCircle(state, 'circles');
      cy.wait(DELAY_IN_MS);
    });
  });
});
