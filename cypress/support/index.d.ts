/// <reference types="cypress" />

import { CircleState } from './types';

// import type Inputs from '../fixtures/inputs.json';
interface FixtureTypes {
  // inputs: typeof Inputs;
  // Add other fixtures here
}

type CheckButtonState = {
  button: string,
  inputs?: {
    inputName: string,
    inputValue: string,
    }[],
  expectedState: { chainers: string, value?: unknown }
}

declare global {
  namespace Cypress {
    interface Chainable {
      fixture<K extends keyof FixtureTypes>(
        fixtureName: K,
      ): Chainable<FixtureTypes[K]>;

      /**
       * Custom command to select DOM element by data-test attribute.
       * @example cy.getBySel('input')
       */
      getBySel(value: string): Chainable<JQuery<HTMLElement>>;

      /**
       * Custom command to select every DOM element by data-test attribute.
       * @example cy.getBySelLike('button')
       */
      getBySelLike(value: string): Chainable<JQuery<HTMLElement>>;

      /**
       * Custom command to check button element disabled/enabled depend on array of inputs empty/filled.
       * @param {Object} config - config to test button acording inputs content
       * @param {string} iconfig.button - button alias without @
       * @param {Object[]} iconfig.inputs - an optional array of objects describing the state of inputs
       * @param {string} iconfig.inputs.inputName - input alias without @
       * @param {string} iconfig.inputs.inputValue - the value that will be typed in the input
       * @param {string} iconfig.expectedState - exprected state of the button in format of cypress `.should()` method
       * @example cy.checkButtonState({ button: 'addBtn', input: 'input', inputValue: 'a' })
       */
      checkButtonState({ button, inputs, expectedState }: CheckButtonState): void

      /**
       * Custom command to check circle element against of state.
       * @example cy.checkCircle(state, 'circle')
       */
      checkCircle(state: CircleState, circle: string): void

      /**
       * Custom command to check all circles elements against an array of states.
       * @example cy.checkAllCircls(state, 'circle', delay)
       */
      checkAllCircls(states: CircleState[], circle: string, delay?: number): void
    }
  }
}