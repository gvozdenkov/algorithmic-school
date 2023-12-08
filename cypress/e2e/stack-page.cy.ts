import { ROUTE } from '#shared/config';
import { HEAD, SHORT_DELAY_IN_MS } from '#shared/constants';
import { CircleState } from 'cypress/support/types';

const addFirstState: CircleState[] = [
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
const addSecondState: CircleState[] = [
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
const addThirdState: CircleState[] = [
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

beforeEach(() => {
  cy.visit(`/#/${ROUTE.STACK}`);
  cy.getBySel('add-btn').should('be.disabled').as('addBtn');
  cy.getBySel('remove-btn').should('be.disabled').as('removeBtn');
  cy.getBySel('clear-btn').should('be.disabled').as('clearBtn');
  cy.getBySel('input').should('be.empty').as('input');
});

describe('`Add` button state', () => {
  beforeEach(() => {
    cy.get('@input').clear();
  });

  it('should be disabled for empty input', () => {
    cy.checkButtonState({
      button: 'addBtn',
      expectedState: { chainers: 'be.disabled' },
    });
  });

  it('should be enabled if the input not empty', () => {
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
  });
});

describe('vizualisation of stack operation', () => {
  // clean up stack befor each test
  beforeEach(() => {
    cy.getBySelLike('circle-').should(
      ($circles) => $circles.length > 0 && cy.get('@clearBtn').click(),
    );
  });

  it('should push with animation', () => {
    cy.get('@input').type('a');
    cy.get('@addBtn').click();
    cy.getBySelLike('circle-').as('circles');
    cy.checkAllCircls(addFirstState, 'circles', SHORT_DELAY_IN_MS);

    cy.get('@input').type('b');
    cy.get('@addBtn').click();
    cy.checkAllCircls(addSecondState, 'circles', SHORT_DELAY_IN_MS);

    cy.get('@input').type('c');
    cy.get('@addBtn').click();
    cy.checkAllCircls(addThirdState, 'circles', SHORT_DELAY_IN_MS);
  });

  it('should pop with animation', () => {
    cy.get('@input').type('a');
    cy.get('@addBtn').click();
    cy.get('@input').type('b');
    cy.get('@addBtn').click();
    cy.get('@input').type('c');
    cy.get('@addBtn').click();
    cy.getBySelLike('circle-').as('circles');

    cy.get('@removeBtn').click();
    cy.checkAllCircls(removeState, 'circles', SHORT_DELAY_IN_MS);
  });

  it('should clear the stack', () => {
    cy.get('@input').type('a');
    cy.get('@addBtn').click();

    cy.get('@clearBtn').click();
    cy.get('circle-').should('have.length', 0);
  });
});
