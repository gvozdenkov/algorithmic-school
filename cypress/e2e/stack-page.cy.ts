import { HEAD, SHORT_DELAY_IN_MS } from '#shared/constants';
import { CircleState } from 'cypress/support/types';

const addOneState: CircleState[] = [
  {
    color: ['changing'],
    value: ['a'],
    index: [0],
    head: [HEAD],
  },
  {
    color: ['default'],
    value: ['a'],
    index: [0],
    head: [HEAD],
  },
];
const addTwoState: CircleState[] = [
  {
    color: ['default', 'changing'],
    value: ['a', 'b'],
    index: [0, 1],
    head: ['', HEAD],
  },
  {
    color: ['default', 'default'],
    value: ['a', 'b'],
    index: [0, 1],
    head: ['', HEAD],
  },
];
const addThreeState: CircleState[] = [
  {
    color: ['default', 'default', 'changing'],
    value: ['a', 'b', 'c'],
    index: [0, 1, 2],
    head: ['', '', HEAD],
  },
  {
    color: ['default', 'default', 'default'],
    value: ['a', 'b', 'c'],
    index: [0, 1, 2],
    head: ['', '', HEAD],
  },
];

const removeState: CircleState[] = [
  {
    color: ['default', 'default', 'changing'],
    value: ['a', 'b', 'c'],
    index: [0, 1, 2],
    head: ['', '', HEAD],
  },
  {
    color: ['default', 'default'],
    value: ['a', 'b'],
    index: [0, 1],
    head: ['', HEAD],
  },
];

describe('Stack page', () => {
  beforeEach(() => {
    cy.visit('/#/stack');
    cy.getBySel('add-btn').should('be.disabled').as('addBtn');
    cy.getBySel('remove-btn').should('be.disabled').as('removeBtn');
    cy.getBySel('clear-btn').should('be.disabled').as('clearBtn');
    cy.getBySel('input').should('be.empty').as('input');
  });

  afterEach(() => {
    cy.get('@input').clear();
    cy.get('@input').should('be.empty');
  });

  it('button disabled w/ empty input & vice versa', () => {
    cy.checkButton({ button: 'addBtn', input: 'input', inputValue: 'a' });
  });

  it('push to stack', () => {
    cy.get('@input').type('a');
    cy.get('@addBtn').click();
    cy.getBySelLike('circle-').as('circles');
    cy.checkAllCircls(addOneState, 'circles', SHORT_DELAY_IN_MS);

    cy.get('@input').type('b');
    cy.get('@addBtn').click();
    cy.checkAllCircls(addTwoState, 'circles', SHORT_DELAY_IN_MS);

    cy.get('@input').type('c');
    cy.get('@addBtn').click();
    cy.checkAllCircls(addThreeState, 'circles', SHORT_DELAY_IN_MS);
  });

  it('pop from stack', () => {
    cy.get('@input').type('a');
    cy.get('@addBtn').click();
    cy.get('@input').type('b');
    cy.get('@addBtn').click();
    cy.get('@input').type('c');
    cy.get('@addBtn').click();

    cy.get('@removeBtn').click();
    cy.getBySelLike('circle-').as('circles');
    cy.checkAllCircls(removeState, 'circles', SHORT_DELAY_IN_MS);
  });

  it('clear stack', () => {
    cy.get('@input').type('a');
    cy.get('@addBtn').click();
    cy.get('@input').type('b');
    cy.get('@addBtn').click();

    cy.get('@clearBtn').click();
    cy.get('circle-').should('have.length', 0);
  });
});
