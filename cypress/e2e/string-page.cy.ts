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

beforeEach(() => {
  cy.visit('/#/recursion');
  cy.getBySel('button').as('button');
  cy.getBySel('input').should('be.empty').as('input');
});

afterEach(() => {
  cy.get('@input').clear();
  cy.get('@input').should('be.empty');
});

const text = 'hello';

it('button disabled w/ empty input & vice versa', () => {
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

  cy.get('@input').clear();

  cy.checkButtonState({
    button: 'button',
    expectedState: { chainers: 'be.disabled' },
  });
});

it('animation correct', () => {
  cy.get('@input').type(text);
  cy.get('@button').click();
  cy.getBySelLike('circle-').should('have.length', text.length).as('circles');

  states.forEach((state) => {
    cy.checkCircle(state, 'circles');
    cy.wait(DELAY_IN_MS);
  });
});
