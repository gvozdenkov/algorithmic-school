import { StateGenerator } from '#shared/types';
import { reversArrayGen } from '.';

type Res = StateGenerator<string>;
const str = ['a', 'b', 'c', 'd'];
const reverseGen = reversArrayGen(str);

describe.each([
  {
    expected: {
      arr: ['a', 'b', 'c', 'd'],
      state: ['default', 'default', 'default', 'default'],
    } as Res,
  },
  {
    expected: {
      arr: ['a', 'b', 'c', 'd'],
      state: ['changing', 'default', 'default', 'changing'],
    } as Res,
  },
  {
    expected: {
      arr: ['d', 'b', 'c', 'a'],
      state: ['modified', 'changing', 'changing', 'modified'],
    } as Res,
  },
  {
    expected: {
      arr: ['d', 'c', 'b', 'a'],
      state: ['modified', 'modified', 'modified', 'modified'],
    } as Res,
  },
])('reverse-array: state\narr: $expected.arr\nstate: $expected.state', ({ expected }) => {
  it(`return \narr: [${expected.arr}]  \nstate: [${expected.state}]`, () => {
    expect(reverseGen.next().value).toEqual(expected as Res);
  });
});
