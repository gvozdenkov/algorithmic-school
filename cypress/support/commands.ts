/// <reference types="cypress" />

import { colorSwitchToRGB } from '#shared/lib';

// ***********************************************
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

Cypress.Commands.add('getBySel', (selector, ...args) => {
  return cy.get(`[data-test=${selector}]`, ...args);
});

Cypress.Commands.add('getBySelLike', (selector, ...args) => {
  return cy.get(`[data-test*=${selector}]`, ...args);
});

Cypress.Commands.add('checkButtonState', ({ button, inputs, expectedState }) => {
  inputs &&
    inputs.forEach((input) => {
      cy.get(`@${input.inputName}`).clear();
      cy.get(`@${input.inputName}`).type(input.inputValue);
    });

  cy.get(`@${button}`).should(expectedState.chainers, expectedState.value);
});

Cypress.Commands.add('checkCircle', (state, circle) => {
  cy.get(`@${circle}`)
    .getBySel('circleShape')
    .each((el, i) => {
      expect(el).to.have.css('border', `4px solid ${colorSwitchToRGB(state.color[i])}`);
    });

  state.value &&
    cy
      .get(`@${circle}`)
      .getBySel('circleText')
      .each((el, i) => {
        expect(el).to.contain(state.value[i]);
      });

  state.head &&
    cy
      .get(`@${circle}`)
      .getBySel('circleHead')
      .each((el, i) => {
        expect(el).to.contain(state.head[i]);
      });

  state.tail &&
    cy
      .get(`@${circle}`)
      .getBySel('circleTail')
      .each((el, i) => {
        expect(el).to.contain(state.tail[i] || '');
      });

  state.index &&
    cy
      .get(`@${circle}`)
      .getBySel('circleIndex')
      .each((el, i) => {
        expect(el).to.contain(state.index[i] || '');
      });
});

Cypress.Commands.add('checkAllCircls', (states, circle, delay = 0) => {
  states.forEach((state) => {
    cy.checkCircle(state, circle);
    delay && cy.wait(delay);
  });
});
