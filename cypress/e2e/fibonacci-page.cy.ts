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
  cy.visit('/#/fibonacci');
  cy.getBySel('button').as('button');
  cy.getBySel('input').should('be.empty').as('input');
});

afterEach(() => {
  cy.get('@input').clear();
  cy.get('@input').should('be.empty');
});

it('Button disabled w/ empty input & vice versa', () => {
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

it('Visual correct', () => {
  const number = 5;

  cy.get('@input').type(number.toString());
  cy.get('@button').click();
  cy.getBySelLike('circle-').as('circles');

  states.forEach((state) => {
    cy.checkCircle(state, 'circles');
    cy.wait(SHORT_DELAY_IN_MS);
  });

  cy.get('@circles').should('have.length', number + 1);
});
