import { create } from 'react-test-renderer';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { Button } from './button';

const buttonText = 'Button';
describe('Button ui', () => {
  it('with text', () => {
    const tree = create(<Button text={buttonText} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('without text', () => {
    const tree = create(<Button />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('disabled', () => {
    const tree = create(<Button text={buttonText} disabled />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('loading state', () => {
    const tree = create(<Button text={buttonText} isLoader />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('actions', () => {
  it('onClick', () => {
    let newButtonText = 'new';
    render(<Button text={buttonText} onClick={() => (newButtonText = buttonText)} />);

    fireEvent.click(screen.getByText(buttonText));
    expect(buttonText).toEqual(newButtonText);
  });
});
