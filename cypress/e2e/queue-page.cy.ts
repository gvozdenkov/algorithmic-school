import { HEAD, SHORT_DELAY_IN_MS, TAIL } from '#shared/constants';
import { CircleState } from 'cypress/support/types';

const initialState: CircleState[] = [
  {
    color: ['default', 'default', 'default', 'default', 'default', 'default', 'default'],
    value: ['', '', '', '', '', '', ''],
    index: [0, 1, 2, 3, 4, 5, 6, 7],
    head: ['', '', '', '', '', '', ''],
    tail: ['', '', '', '', '', '', ''],
  },
];
const addAState: CircleState[] = [
  {
    color: ['changing', 'default', 'default', 'default', 'default', 'default', 'default'],
    value: ['a', '', '', '', '', '', ''],
    index: [0, 1, 2, 3, 4, 5, 6, 7],
    head: [HEAD, '', '', '', '', '', ''],
    tail: [TAIL, '', '', '', '', '', ''],
  },
  {
    color: ['default', 'default', 'default', 'default', 'default', 'default', 'default'],
    value: ['a', '', '', '', '', '', ''],
    index: [0, 1, 2, 3, 4, 5, 6, 7],
    head: [HEAD, '', '', '', '', '', ''],
    tail: [TAIL, '', '', '', '', '', ''],
  },
];
const addBState: CircleState[] = [
  {
    color: ['default', 'changing', 'default', 'default', 'default', 'default', 'default'],
    value: ['a', 'b', '', '', '', '', ''],
    index: [0, 1, 2, 3, 4, 5, 6, 7],
    head: [HEAD, '', '', '', '', '', ''],
    tail: ['', TAIL, '', '', '', '', ''],
  },
  {
    color: ['default', 'default', 'default', 'default', 'default', 'default', 'default'],
    value: ['a', 'b', '', '', '', '', ''],
    index: [0, 1, 2, 3, 4, 5, 6, 7],
    head: [HEAD, '', '', '', '', '', ''],
    tail: ['', TAIL, '', '', '', '', ''],
  },
];
const addCState: CircleState[] = [
  {
    color: ['default', 'default', 'changing', 'default', 'default', 'default', 'default'],
    value: ['a', 'b', 'c', '', '', '', ''],
    index: [0, 1, 2, 3, 4, 5, 6, 7],
    head: [HEAD, '', '', '', '', '', ''],
    tail: ['', '', TAIL, '', '', '', ''],
  },
  {
    color: ['default', 'default', 'default', 'default', 'default', 'default', 'default'],
    value: ['a', 'b', 'c', '', '', '', ''],
    index: [0, 1, 2, 3, 4, 5, 6, 7],
    head: [HEAD, '', '', '', '', '', ''],
    tail: ['', '', TAIL, '', '', '', ''],
  },
];

const removeAState: CircleState[] = [
  {
    color: ['changing', 'default', 'default', 'default', 'default', 'default', 'default'],
    value: ['a', 'b', 'c', '', '', '', ''],
    index: [0, 1, 2, 3, 4, 5, 6, 7],
    head: [HEAD, '', '', '', '', '', ''],
    tail: ['', '', TAIL, '', '', '', ''],
  },
  {
    color: ['default', 'default', 'default', 'default', 'default', 'default', 'default'],
    value: ['', 'b', 'c', '', '', '', ''],
    index: [0, 1, 2, 3, 4, 5, 6, 7],
    head: ['', HEAD, '', '', '', '', ''],
    tail: ['', '', TAIL, '', '', '', ''],
  },
];

const addDState: CircleState[] = [
  {
    color: ['default', 'default', 'default', 'changing', 'default', 'default', 'default'],
    value: ['', 'b', 'c', 'd', '', '', ''],
    index: [0, 1, 2, 3, 4, 5, 6, 7],
    head: ['', HEAD, '', '', '', '', ''],
    tail: ['', '', '', TAIL, '', '', ''],
  },
  {
    color: ['default', 'default', 'default', 'default', 'default', 'default', 'default'],
    value: ['', 'b', 'c', 'd', '', '', ''],
    index: [0, 1, 2, 3, 4, 5, 6, 7],
    head: ['', HEAD, '', '', '', '', ''],
    tail: ['', '', '', TAIL, '', '', ''],
  },
];

beforeEach(() => {
  cy.visit('/#/queue');
  cy.getBySel('add-btn').should('be.disabled').as('addBtn');
  cy.getBySel('remove-btn').should('be.disabled').as('removeBtn');
  cy.getBySel('clear-btn').should('be.disabled').as('clearBtn');
  cy.getBySel('input').should('be.empty').as('input');
  cy.getBySelLike('circle-').as('circles');
});

afterEach(() => {
  cy.get('@input').clear();
  cy.get('@input').should('be.empty');
});

it('Button disabled w/ empty input & vice versa', () => {
  cy.checkButtonState({
    button: 'addBtn',
    inputs: [
      {
        inputName: 'input',
        inputValue: 'a',
      },
    ],
    expectedState: { chainers: 'to.be.not.disabled' },
  });

  cy.get('@input').clear();

  cy.checkButtonState({
    button: 'addBtn',
    expectedState: { chainers: 'be.disabled' },
  });
});

it('Initail state', () => {
  cy.checkAllCircls(initialState, 'circles', 0);
});

it('Add and Remove elements', () => {
  cy.get('@input').should('be.empty').type('a');
  cy.get('@addBtn').click();
  cy.checkAllCircls(addAState, 'circles', SHORT_DELAY_IN_MS);

  cy.get('@input').should('be.empty').type('b');
  cy.get('@addBtn').click();
  cy.checkAllCircls(addBState, 'circles', SHORT_DELAY_IN_MS);

  cy.get('@input').should('be.empty').type('c');
  cy.get('@addBtn').click();
  cy.checkAllCircls(addCState, 'circles', SHORT_DELAY_IN_MS);

  cy.get('@removeBtn').click();
  cy.checkAllCircls(removeAState, 'circles', SHORT_DELAY_IN_MS);

  cy.get('@input').should('be.empty').type('d');
  cy.get('@addBtn').click();
  cy.checkAllCircls(addDState, 'circles', SHORT_DELAY_IN_MS);

  cy.get('@clearBtn').click();
  cy.checkAllCircls(initialState, 'circles', SHORT_DELAY_IN_MS);
});
