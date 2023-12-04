import { HEAD, SHORT_DELAY_IN_MS } from '#shared/constants';
import { DataCircleState } from 'cypress/support/types';

const addOneState: DataCircleState[] = [
  {
    color: ['changing'],
    letter: ['a'],
    index: ['0'],
    head: [HEAD],
  },
  {
    color: ['default'],
    letter: ['a'],
    index: ['0'],
    head: [HEAD],
  },
];
const addTwoState: DataCircleState[] = [
  {
    color: ['default', 'changing'],
    letter: ['a', 'b'],
    index: ['0', '1'],
    head: ['', HEAD],
  },
  {
    color: ['default', 'default'],
    letter: ['a', 'b'],
    index: ['0', '1'],
    head: ['', HEAD],
  },
];
const addThreeState: DataCircleState[] = [
  {
    color: ['default', 'default', 'changing'],
    letter: ['a', 'b', 'c'],
    index: ['0', '1', '2'],
    head: ['', '', HEAD],
  },
  {
    color: ['default', 'default', 'default'],
    letter: ['a', 'b', 'c'],
    index: ['0', '1', '2'],
    head: ['', '', HEAD],
  },
];

const removeState: DataCircleState[] = [
  {
    color: ['default', 'default', 'changing'],
    letter: ['a', 'b', 'c'],
    index: ['0', '1', '2'],
    head: ['', '', HEAD],
  },
  {
    color: ['default', 'default'],
    letter: ['a', 'b'],
    index: ['0', '1'],
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

  it('button disabled with empty input', () => {
    cy.get('@addBtn').should('be.disabled');
  });

  it('button enabled with not empty input', () => {
    cy.get('@input').type('a');
    cy.get('@input').should('have.value', 'a');
    cy.get('@addBtn').should('to.be.not.disabled');
  });

  it('push to stack', () => {
    cy.get('@input').type('a');
    cy.get('@addBtn').click();

    cy.getBySelLike('circle-').as('circles');

    addOneState.forEach((state) => {
      cy.checkCircle(state, 'circles');
      cy.wait(SHORT_DELAY_IN_MS);
    });

    cy.get('@input').type('b');
    cy.get('@addBtn').click();

    addTwoState.forEach((state) => {
      cy.checkCircle(state, 'circles');
      cy.wait(SHORT_DELAY_IN_MS);
    });

    cy.get('@input').type('c');
    cy.get('@addBtn').click();

    addThreeState.forEach((state) => {
      cy.checkCircle(state, 'circles');
      cy.wait(SHORT_DELAY_IN_MS);
    });
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

    removeState.forEach((state) => {
      cy.checkCircle(state, 'circles');
      cy.wait(SHORT_DELAY_IN_MS);
    });
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
