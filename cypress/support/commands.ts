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

Cypress.Commands.add('checkButton', ({ button, input, inputValue }) => {
  cy.get(`@${input}`).clear();
  cy.get(`@${button}`).should('be.disabled');

  cy.get(`@${input}`).type(inputValue);
  cy.get(`@${input}`).should('have.value', inputValue);
  cy.get(`@${button}`).should('to.be.not.disabled');
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
        expect(el).to.contain(state.tail[i]);
      });

  state.index &&
    cy
      .get(`@${circle}`)
      .getBySel('circleIndex')
      .each((el, i) => {
        expect(el).to.contain(state.index[i].toString());
      });
});

Cypress.Commands.add('checkAllCircls', (states, circle, delay = 0) => {
  states.forEach((state) => {
    cy.checkCircle(state, circle);
    delay && cy.wait(delay);
  });
});
