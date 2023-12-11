import { fireEvent, render } from '@testing-library/react';
import { create } from 'react-test-renderer';

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

test('onClick handler works', () => {
  const handler = jest.fn();

  const { getByText } = render(<Button text='Button' onClick={handler} />);

  const button = getByText('Button');
  fireEvent.click(button);
  expect(handler).toHaveBeenCalledTimes(1);
});
