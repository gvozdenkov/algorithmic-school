import { bubbleSortGen } from '.';

import { StateGenerator } from '#shared/types';

type Res = StateGenerator<number>;
const array = [2, 5, 1];
const sortASC = bubbleSortGen({ array, order: 'asc' });

describe.each([
  {
    expected: {
      arr: [2, 5, 1],
      state: ['default', 'default', 'default'],
    } as Res,
  },
  {
    expected: {
      arr: [2, 5, 1],
      state: ['changing', 'changing', 'default'],
    } as Res,
  },
  {
    expected: {
      arr: [2, 5, 1],
      state: ['default', 'changing', 'changing'],
    } as Res,
  },
  {
    expected: {
      arr: [2, 1, 5],
      state: ['default', 'default', 'modified'],
    } as Res,
  },
  {
    expected: {
      arr: [2, 1, 5],
      state: ['changing', 'changing', 'modified'],
    } as Res,
  },
  {
    expected: {
      arr: [1, 2, 5],
      state: ['default', 'modified', 'modified'],
    } as Res,
  },
  {
    expected: {
      arr: [1, 2, 5],
      state: ['modified', 'modified', 'modified'],
    } as Res,
  },
])('bubble-sort: ASC\narr: $expected.arr\nstate: $expected.state', ({ expected }) => {
  it(`return \narr: [${expected.arr}]  \nstate: [${expected.state}]`, () => {
    expect(sortASC.next().value).toEqual(expected as Res);
  });
});

const sortASCSingle = bubbleSortGen({ array: [5], order: 'asc' });

describe.each([
  {
    expected: {
      arr: [5],
      state: ['default'],
    } as Res,
  },
  {
    expected: {
      arr: [5],
      state: ['modified'],
    } as Res,
  },
])('bubble-sort: ASC [5]\narr: $expected.arr\nstate: $expected.state', ({ expected }) => {
  it(`return \narr: [${expected.arr}]  \nstate: [${expected.state}]`, () => {
    expect(sortASCSingle.next().value).toEqual(expected as Res);
  });
});

const sortEmptyASC = bubbleSortGen({ array: [], order: 'asc' });
it('bubble-sort: ASC Empty []', () => {
  expect(sortEmptyASC.next().value).toEqual({
    arr: [],
    state: [],
  } as Res);
});

const sortDESC = bubbleSortGen({ array, order: 'desc' });
describe.each([
  {
    expected: {
      arr: [2, 5, 1],
      state: ['default', 'default', 'default'],
    } as Res,
  },
  {
    expected: {
      arr: [2, 5, 1],
      state: ['changing', 'changing', 'default'],
    } as Res,
  },
  {
    expected: {
      arr: [5, 2, 1],
      state: ['default', 'changing', 'changing'],
    } as Res,
  },
  {
    expected: {
      arr: [5, 2, 1],
      state: ['default', 'default', 'modified'],
    } as Res,
  },
  {
    expected: {
      arr: [5, 2, 1],
      state: ['changing', 'changing', 'modified'],
    } as Res,
  },
  {
    expected: {
      arr: [5, 2, 1],
      state: ['default', 'modified', 'modified'],
    } as Res,
  },
  {
    expected: {
      arr: [5, 2, 1],
      state: ['modified', 'modified', 'modified'],
    } as Res,
  },
])('bubble-sort: DESC\narr: $expected.arr\nstate: $expected.state', ({ expected }) => {
  it(`return \narr: [${expected.arr}]  \nstate: [${expected.state}]`, () => {
    expect(sortDESC.next().value).toEqual(expected as Res);
  });
});

const sortEmptyDesc = bubbleSortGen({ array: [], order: 'desc' });
it('bubble-sort: DESC Empty []', () => {
  expect(sortEmptyDesc.next().value).toEqual({
    arr: [],
    state: [],
  } as Res);
});

const sortDescSingle = bubbleSortGen({ array: [5], order: 'desc' });

describe.each([
  {
    expected: {
      arr: [5],
      state: ['default'],
    } as Res,
  },
  {
    expected: {
      arr: [5],
      state: ['modified'],
    } as Res,
  },
])('bubble-sort: DESC [5]\narr: $expected.arr\nstate: $expected.state', ({ expected }) => {
  it(`return \narr: [${expected.arr}]  \nstate: [${expected.state}]`, () => {
    expect(sortDescSingle.next().value).toEqual(expected as Res);
  });
});
