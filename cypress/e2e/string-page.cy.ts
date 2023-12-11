import { CircleState } from 'cypress/support/types';

import { ROUTE } from '#shared/config';
import { DELAY_IN_MS } from '#shared/constants';

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

beforeEach(() => {
  cy.visit(`/#/${ROUTE.RECURSION}`);
  cy.getBySel('button').as('button');
  cy.getBySel('input').should('be.empty').as('input');
});

const text = 'hello';

describe('button state', () => {
  beforeEach(() => {
    cy.get('@input').clear();
  });

  it('should be disabled for empty input', () => {
    cy.checkButtonState({
      button: 'button',
      expectedState: { chainers: 'be.disabled' },
    });
  });

  it('should be enabled if the input not empty', () => {
    cy.checkButtonState({
      button: 'button',
      inputs: [
        {
          inputName: 'input',
          inputValue: text,
        },
      ],
      expectedState: { chainers: 'to.be.not.disabled' },
    });
  });
});

describe('visualization of the algorithm', () => {
  it('should display correct circles and color states', () => {
    cy.get('@input').type(text);
    cy.get('@button').click();
    cy.getBySelLike('circle-').should('have.length', text.length).as('circles');

    states.forEach((state) => {
      cy.checkCircle(state, 'circles');
      cy.wait(DELAY_IN_MS);
    });
  });
});
