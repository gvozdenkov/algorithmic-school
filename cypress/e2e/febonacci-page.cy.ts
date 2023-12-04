import { SHORT_DELAY_IN_MS } from '#shared/constants';
import { colorSwitchToRGB } from '#shared/lib';
import { ElementState } from '#shared/types';

type State = {
  color: ElementState[];
  number: number[];
};

const state: State[] = [
  {
    color: ['default'],
    number: [1],
  },
  {
    color: ['default', 'default'],
    number: [1, 1],
  },
  {
    color: ['default', 'default', 'default'],
    number: [1, 1, 2],
  },
  {
    color: ['default', 'default', 'default', 'default'],
    number: [1, 1, 2, 3],
  },
  {
    color: ['default', 'default', 'default', 'default', 'default'],
    number: [1, 1, 2, 3, 5],
  },
  {
    color: ['default', 'default', 'default', 'default', 'default', 'default'],
    number: [1, 1, 2, 3, 5, 8],
  },
];

describe('Fibonacci sequence', () => {
  beforeEach(() => {
    cy.visit('/#/fibonacci');
    cy.getBySel('button').as('button');
    cy.getBySel('input').should('be.empty').as('input');
  });

  afterEach(() => {
    cy.get('@input').clear();
    cy.get('@input').should('be.empty');
  });

  it('button disabled with empty input', () => {
    cy.get('@button').should('be.disabled');
  });

  it('button enabled with not empty input', () => {
    cy.get('@input').type('5');
    cy.get('@input').should('have.value', '5');
    cy.get('@button').should('to.be.not.disabled');
  });

  it('Visual correct', () => {
    const text = '5';

    cy.get('@input').type(text);
    cy.get('@button').click();

    cy.getBySelLike('circleText').as('circleTexts');
    cy.getBySelLike('circleShape').as('circleShapes');

    state.forEach(({ color, number }) => {
      cy.get('@circleTexts').each((el, i) => {
        expect(el).to.contain(number[i]);
      });

      cy.get('@circleShapes').each((el, i) => {
        expect(el).to.have.css('border', `4px solid ${colorSwitchToRGB(color[i])}`);
      });

      cy.wait(SHORT_DELAY_IN_MS);
    });

    cy.get('@circleTexts').should('have.length', +text + 1);
  });
});
