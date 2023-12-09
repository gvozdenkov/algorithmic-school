import { create } from 'react-test-renderer';

import { Circle } from './circle';

describe('Circle ui', () => {
  it('without text', () => {
    const tree = create(<Circle />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('with text', () => {
    const tree = create(<Circle letter='a' />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('with head', () => {
    const tree = create(<Circle head={'head'} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('with element in head', () => {
    const tree = create(<Circle head={<Circle letter='a' />} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('with tail', () => {
    const tree = create(<Circle tail='tail' />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('with element in tail', () => {
    const tree = create(<Circle tail={<Circle letter='a' />} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('with index', () => {
    const tree = create(<Circle index={1} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('with isSmall prop', () => {
    const tree = create(<Circle isSmall />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('state: default', () => {
    const tree = create(<Circle state='default' />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('state: changing', () => {
    const tree = create(<Circle state='changing' />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('state: modified', () => {
    const tree = create(<Circle state='modified' />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
