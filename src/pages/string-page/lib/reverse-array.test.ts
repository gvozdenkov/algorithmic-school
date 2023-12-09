import { StateGenerator } from '#shared/types';
import { reversArrayGen } from '.';

type Res = StateGenerator<string>;
const reverseEvenGen = reversArrayGen(['a', 'b', 'c', 'd']);

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
])('reverse-array: Even, state\narr: $expected.arr\nstate: $expected.state', ({ expected }) => {
  it(`return \narr: [${expected.arr}]  \nstate: [${expected.state}]`, () => {
    expect(reverseEvenGen.next().value).toEqual(expected as Res);
  });
});

const reverseOddGen = reversArrayGen(['a', 'b', 'c', 'd', 'e']);
describe.each([
  {
    expected: {
      arr: ['a', 'b', 'c', 'd', 'e'],
      state: ['default', 'default', 'default', 'default', 'default'],
    } as Res,
  },
  {
    expected: {
      arr: ['a', 'b', 'c', 'd', 'e'],
      state: ['changing', 'default', 'default', 'default', 'changing'],
    } as Res,
  },
  {
    expected: {
      arr: ['e', 'b', 'c', 'd', 'a'],
      state: ['modified', 'changing', 'default', 'changing', 'modified'],
    } as Res,
  },
  {
    expected: {
      arr: ['e', 'd', 'c', 'b', 'a'],
      state: ['modified', 'modified', 'changing', 'modified', 'modified'],
    } as Res,
  },
  {
    expected: {
      arr: ['e', 'd', 'c', 'b', 'a'],
      state: ['modified', 'modified', 'modified', 'modified', 'modified'],
    } as Res,
  },
])('reverse-array: Odd, state\narr: $expected.arr\nstate: $expected.state', ({ expected }) => {
  it(`return \narr: [${expected.arr}]  \nstate: [${expected.state}]`, () => {
    expect(reverseOddGen.next().value).toEqual(expected as Res);
  });
});

const reverseSingleGen = reversArrayGen(['a']);
describe.each([
  {
    expected: {
      arr: ['a'],
      state: ['default'],
    } as Res,
  },
  {
    expected: {
      arr: ['a'],
      state: ['changing'],
    } as Res,
  },
  {
    expected: {
      arr: ['a'],
      state: ['modified'],
    } as Res,
  },
])('reverse-array: Single, state\narr: $expected.arr\nstate: $expected.state', ({ expected }) => {
  it(`return \narr: [${expected.arr}]  \nstate: [${expected.state}]`, () => {
    expect(reverseSingleGen.next().value).toEqual(expected as Res);
  });
});

const reverseEmptyGen = reversArrayGen([]);
it('reverse-array: Empty []', () => {
  expect(reverseEmptyGen.next().value).toEqual({
    arr: [],
    state: [],
  } as Res);
});
