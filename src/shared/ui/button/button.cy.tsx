import { Button } from './button';

describe('button', () => {
  var label = 'Save';
  var testClass = 'test-button';

  it('should render button with label "Save" and trigger onClick', () => {
    cy.mount(<Button text={label} data-test={testClass} onClick={cy.stub().as('click')} />);
    cy.contains(label);
    cy.getBySel(testClass).click();
    cy.get('@click').should('be.called');
  });

  it('should render disabled button', () => {
    cy.mount(<Button text={label} data-test={testClass} disabled />);
    cy.contains(label);
    cy.getBySel(testClass).should('be.disabled');
  });

  it('should render disabled button in loading state with hidden label', () => {
    cy.mount(<Button text={label} data-test={testClass} isLoader />);
    cy.contains(label);
    cy.get('svg').should('be.visible');
    cy.getBySel(testClass).should('be.disabled');
  });
});
