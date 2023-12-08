import { ROUTE } from '#shared/config';
import { SHORT_DELAY_IN_MS } from '#shared/constants';
import { CircleState } from 'cypress/support/types';

const states: CircleState[] = [
  {
    color: ['default'],
    value: [1],
  },
  {
    color: ['default', 'default'],
    value: [1, 1],
  },
  {
    color: ['default', 'default', 'default'],
    value: [1, 1, 2],
  },
  {
    color: ['default', 'default', 'default', 'default'],
    value: [1, 1, 2, 3],
  },
  {
    color: ['default', 'default', 'default', 'default', 'default'],
    value: [1, 1, 2, 3, 5],
  },
  {
    color: ['default', 'default', 'default', 'default', 'default', 'default'],
    value: [1, 1, 2, 3, 5, 8],
  },
];

beforeEach(() => {
  cy.visit(`/#/${ROUTE.FIBONACCI}`);
  cy.getBySel('button').as('button');
  cy.getBySel('input').should('be.empty').as('input');
});

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
          inputValue: '5',
        },
      ],
      expectedState: { chainers: 'to.be.not.disabled' },
    });
  });
});

describe('visualization of the algorithm', () => {
  it('should display correct circles and color states', () => {
    const number = 4;

    cy.get('@input').type(number.toString());
    cy.get('@button').click();
    cy.getBySelLike('circle-').as('circles');

    states.forEach((state) => {
      cy.checkCircle(state, 'circles');
      cy.wait(SHORT_DELAY_IN_MS);
    });

    cy.get('@circles').should('have.length', number + 1);
  });
});
