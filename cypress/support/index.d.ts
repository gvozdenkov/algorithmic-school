/// <reference types="cypress" />

import type Inputs from '../fixtures/inputs.json';
import { CircleState } from './types';

interface FixtureTypes {
  inputs: typeof Inputs;
  // Add other fixtures here
}

declare global {
  namespace Cypress {
    interface Chainable {
      fixture<K extends keyof FixtureTypes>(
        fixtureName: K,
      ): Chainable<FixtureTypes[K]>;

      /**
       * Custom command to select DOM element by data-test attribute.
       * @example cy.getBySel('greeting')
       */
      getBySel(value: string): Chainable<JQuery<HTMLElement>>;

      /**
       * Custom command to select every DOM element by data-test attribute.
       * @example cy.getBySelLike('greeting')
       */
      getBySelLike(value: string): Chainable<JQuery<HTMLElement>>;

      /**
       * Custom command to check circle element.
       * @example cy.getBySelLike('greeting')
       */
      checkButton({button, input, inputValue}: {button: string, input: string, inputValue: string}): void

      /**
       * Custom command to check circle element.
       * @example cy.getBySelLike('greeting')
       */
      checkCircle(state: CircleState, circle: string): void
    }
  }
}