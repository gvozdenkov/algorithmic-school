import { colorSwitchToRGB } from '#shared/lib';

import { Circle } from './circle';

describe('circle', () => {
  it('should render empty circle in all states', () => {
    cy.mount(<Circle letter='a' />);
    cy.getBySel('circleShape').should('have.css', {
      borderColor: `${colorSwitchToRGB('default')}`,
    });

    // cy.mount(<Circle state='changing' />);
    // cy.getBySel('circleShape').should(
    //   'have.css',
    //   'border-color',
    //   `${colorSwitchToRGB('changing')}`,
    // );

    // cy.mount(<Circle state='modified' />);
    // cy.getBySel('circleShape').should(
    //   'have.css',
    //   'border-color',
    //   `${colorSwitchToRGB('modified')}`,
    // );
  });

  it('should render small circle', () => {
    cy.mount(<Circle isSmall />);
    cy.getBySel('circleShape').should('have.css', { width: '56px' });
  });

  it('should render circle with text, index, head and tail', () => {
    cy.mount(<Circle letter='a' index={1} head='head' tail='tail' />);
    cy.contains('a');
    cy.contains('1');
    cy.contains('head');
    cy.contains('tail');
  });
});
