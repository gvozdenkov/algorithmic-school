/// <reference types="cypress" />

import { colorSwitchToRGB } from '#shared/lib';

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
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

Cypress.Commands.add('checkCircle', ({ color, letter, head, index }, circle) => {
  cy.get(`@${circle}`)
    .getBySel('circleShape')
    .each((el, i) => {
      expect(el).to.have.css('border', `4px solid ${colorSwitchToRGB(color[i])}`);
    });

  cy.get(`@${circle}`)
    .getBySel('circleText')
    .each((el, i) => {
      expect(el).to.contain(letter[i]);
    });

  cy.get(`@${circle}`)
    .getBySel('circleHead')
    .each((el, i) => {
      expect(el).to.contain(head[i]);
    });

  cy.get(`@${circle}`)
    .getBySel('circleIndex')
    .each((el, i) => {
      expect(el).to.contain(index[i]);
    });
});
