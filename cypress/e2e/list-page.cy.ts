import { DELAY_IN_MS, HEAD, TAIL } from '#shared/constants';
import { CircleState } from 'cypress/support/types';

const byIndex = 1;

const initialState: CircleState[] = [
  {
    color: ['default', 'default', 'default', 'default'],
    value: ['0', '1', '2', '3'],
    index: [0, 1, 2, 3],
    head: [HEAD, '', '', ''],
    tail: ['', '', '', TAIL],
  },
];

const addToHeadState: CircleState[] = [
  {
    color: ['changing', 'changing', 'default', 'default', 'default'],
    value: ['x', '0', '1', '2', '3'],
    index: [null, 0, 1, 2, 3],
    head: ['', '', '', '', ''],
    tail: ['', '', '', '', TAIL],
  },
  {
    color: ['modified', 'default', 'default', 'default', 'default'],
    value: ['x', '0', '1', '2', '3'],
    index: [0, 1, 2, 3, 4],
    head: [HEAD, '', '', '', ''],
    tail: ['', '', '', '', TAIL],
  },
];

const addToTailState: CircleState[] = [
  {
    color: ['default', 'default', 'default', 'changing', 'changing'],
    value: ['0', '1', '2', 'x', '3'],
    index: [0, 1, 2, null, 3],
    head: ['', '', '', '', ''],
    tail: ['', '', '', '', TAIL],
  },
  {
    color: ['default', 'default', 'default', 'default', 'modified'],
    value: ['0', '1', '2', '3', 'x'],
    index: [0, 1, 2, 3, 4],
    head: [HEAD, '', '', '', ''],
    tail: ['', '', '', '', TAIL],
  },
];

const addByIndexState: CircleState[] = [
  {
    color: ['changing', 'default', 'default', 'default', 'default'],
    value: ['x', '0', '1', '2', '3'],
    index: [null, 0, 1, 2, 3],
    head: ['', '', '', '', ''],
    tail: ['', '', '', '', TAIL],
  },
  {
    color: ['changing', 'changing', 'default', 'default', 'default'],
    value: ['0', 'x', '1', '2', '3'],
    index: [0, null, 1, 2, 3],
    head: [HEAD, '', '', '', ''],
    tail: ['', '', '', '', TAIL],
  },
  {
    color: ['default', 'modified', 'default', 'default', 'default'],
    value: ['0', 'x', '1', '2', '3'],
    index: [0, 1, 2, 3, 4],
    head: [HEAD, '', '', '', ''],
    tail: ['', '', '', '', TAIL],
  },
];

const removeFromHeadState: CircleState[] = [
  {
    color: ['default', 'changing', 'default', 'default', 'default'],
    value: ['', '0', '1', '2', '3'],
    index: [0, null, 1, 2, 3],
    head: [HEAD, '', '', '', ''],
    tail: ['', '', '', '', TAIL],
  },
  {
    color: ['default', 'default', 'default'],
    value: ['1', '2', '3'],
    index: [0, 1, 2],
    head: [HEAD, '', ''],
    tail: ['', '', TAIL],
  },
];

const removeFromTailState: CircleState[] = [
  {
    color: ['default', 'default', 'default', 'default', 'changing'],
    value: ['0', '1', '2', '', '3'],
    index: [0, 1, 2, 3, null],
    head: [HEAD, '', '', '', ''],
    tail: ['', '', '', '', ''],
  },
  {
    color: ['default', 'default', 'default'],
    value: ['0', '1', '2'],
    index: [0, 1, 2],
    head: [HEAD, '', ''],
    tail: ['', '', TAIL],
  },
];

const removeByIndexState: CircleState[] = [
  {
    color: ['changing', 'default', 'default', 'default'],
    value: ['0', '1', '2', '3'],
    index: [0, 1, 2, 3],
    head: [HEAD, '', '', ''],
    tail: ['', '', '', TAIL],
  },
  {
    color: ['changing', 'changing', 'changing', 'default', 'default'],
    value: ['0', '', '1', '2', '3'],
    index: [0, 1, null, 2, 3],
    head: [HEAD, '', '', '', ''],
    tail: ['', '', '', '', TAIL],
  },
  {
    color: ['default', 'default', 'default'],
    value: ['0', '2', '3'],
    index: [0, 1, 2],
    head: [HEAD, '', ''],
    tail: ['', '', TAIL],
  },
];

beforeEach(() => {
  cy.visit('/#/list');
  cy.getBySel('addHeadBtn').should('be.disabled').as('addHeadBtn');
  cy.getBySel('addTailBtn').should('be.disabled').as('addTailBtn');
  cy.getBySel('removeHeadBtn').should('not.be.disabled').as('removeHeadBtn');
  cy.getBySel('removeTailBtn').should('not.be.disabled').as('removeTailBtn');
  cy.getBySel('addByIndexBtn').should('be.disabled').as('addByIndexBtn');
  cy.getBySel('removeByIndexBtn').should('be.disabled').as('removeByIndexBtn');
  cy.getBySel('inputValue').should('be.empty').as('inputValue');
  cy.getBySel('inputIndex').should('be.empty').as('inputIndex');
});

afterEach(() => {
  cy.get('@inputIndex').clear();
  cy.get('@inputValue').clear();
});

describe('Buttons disabled & enabled', () => {
  it('button "Add to Head" enabled w/ input filled', () => {
    cy.checkButtonState({
      button: 'addHeadBtn',
      inputs: [
        {
          inputName: 'inputValue',
          inputValue: 'x',
        },
      ],
      expectedState: { chainers: 'to.be.not.disabled' },
    });
  });

  it('button "Add to Tail" enabled w/ input filled', () => {
    cy.checkButtonState({
      button: 'addTailBtn',
      inputs: [
        {
          inputName: 'inputValue',
          inputValue: 'x',
        },
      ],
      expectedState: { chainers: 'to.be.not.disabled' },
    });
  });

  it('button "Add by Index" enabled w/ input filled', () => {
    cy.checkButtonState({
      button: 'addByIndexBtn',
      inputs: [
        {
          inputName: 'inputValue',
          inputValue: 'x',
        },
        {
          inputName: 'inputIndex',
          inputValue: '1',
        },
      ],
      expectedState: { chainers: 'to.be.not.disabled' },
    });
  });

  it('button "Remove by Index" enabled w/ input filled', () => {
    cy.checkButtonState({
      button: 'removeByIndexBtn',
      inputs: [
        {
          inputName: 'inputIndex',
          inputValue: '1',
        },
      ],
      expectedState: { chainers: 'to.be.not.disabled' },
    });
  });
});

it('Circle initial state', () => {
  cy.getBySelLike('circle-').as('circles');

  initialState.forEach((state) => {
    cy.checkCircle(state, 'circles');
  });
});

describe('Add to list', () => {
  it('Add to Head', () => {
    cy.getBySelLike('circle-').as('circles');

    cy.get('@inputValue').should('be.empty').type('x');
    cy.get('@addHeadBtn').click();
    cy.checkAllCircls(addToHeadState, 'circles', DELAY_IN_MS);
  });

  it('Add to Tail', () => {
    cy.getBySelLike('circle-').as('circles');

    cy.get('@inputValue').should('be.empty').type('x');
    cy.get('@addTailBtn').click();
    cy.checkAllCircls(addToTailState, 'circles', DELAY_IN_MS);
  });

  it('Add by Index', () => {
    cy.getBySelLike('circle-').as('circles');

    cy.get('@inputValue').should('be.empty').type('x');
    cy.get('@inputIndex').should('be.empty').type('1');
    cy.get('@addByIndexBtn').click();
    cy.checkAllCircls(addByIndexState, 'circles', DELAY_IN_MS);
  });
});

describe('Remove from list', () => {
  it('Remove from Head', () => {
    cy.getBySelLike('circle-').as('circles');

    cy.get('@removeHeadBtn').click();
    cy.checkAllCircls(removeFromHeadState, 'circles', DELAY_IN_MS);
  });

  it('Remove from Tail', () => {
    cy.getBySelLike('circle-').as('circles');

    cy.get('@removeTailBtn').click();
    cy.checkAllCircls(removeFromTailState, 'circles', DELAY_IN_MS);
  });

  it('Remove by Index', () => {
    cy.getBySelLike('circle-').as('circles');

    cy.get('@inputIndex').should('be.empty').type(byIndex.toString());
    cy.get('@removeByIndexBtn').click();
    cy.checkAllCircls(removeByIndexState, 'circles', DELAY_IN_MS);
  });
});
