import { selectionSortGen } from '.';

import { StateGenerator } from '#shared/types';

type Res = StateGenerator<number>;
const array = [2, 5, 1];
const sortASC = selectionSortGen({ array, order: 'asc' });

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
      state: ['changing', 'default', 'changing'],
    } as Res,
  },
  {
    expected: {
      arr: [1, 5, 2],
      state: ['modified', 'default', 'default'],
    } as Res,
  },
  {
    expected: {
      arr: [1, 5, 2],
      state: ['modified', 'changing', 'changing'],
    } as Res,
  },
  {
    expected: {
      arr: [1, 2, 5],
      state: ['modified', 'modified', 'default'],
    } as Res,
  },
  {
    expected: {
      arr: [1, 2, 5],
      state: ['modified', 'modified', 'modified'],
    } as Res,
  },
])('selection-sort: ASC\narr: $expected.arr\nstate: $expected.state', ({ expected }) => {
  it(`return \narr: [${expected.arr}]  \nstate: [${expected.state}]`, () => {
    expect(sortASC.next().value).toEqual(expected as Res);
  });
});

const sortASCSingle = selectionSortGen({ array: [5], order: 'asc' });

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
])('selection-sort: ASC [5]\narr: $expected.arr\nstate: $expected.state', ({ expected }) => {
  it(`return \narr: [${expected.arr}]  \nstate: [${expected.state}]`, () => {
    expect(sortASCSingle.next().value).toEqual(expected as Res);
  });
});

const sortEmptyASC = selectionSortGen({ array: [], order: 'asc' });
it('selection-sort: ASC Empty []', () => {
  expect(sortEmptyASC.next().value).toEqual({
    arr: [],
    state: [],
  } as Res);
});

const sortDESC = selectionSortGen({ array, order: 'desc' });
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
      state: ['changing', 'default', 'changing'],
    } as Res,
  },
  {
    expected: {
      arr: [5, 2, 1],
      state: ['modified', 'default', 'default'],
    } as Res,
  },
  {
    expected: {
      arr: [5, 2, 1],
      state: ['modified', 'changing', 'changing'],
    } as Res,
  },
  {
    expected: {
      arr: [5, 2, 1],
      state: ['modified', 'modified', 'default'],
    } as Res,
  },
  {
    expected: {
      arr: [5, 2, 1],
      state: ['modified', 'modified', 'modified'],
    } as Res,
  },
])('selection-sort: DESC\narr: $expected.arr\nstate: $expected.state', ({ expected }) => {
  it(`return \narr: [${expected.arr}]  \nstate: [${expected.state}]`, () => {
    expect(sortDESC.next().value).toEqual(expected as Res);
  });
});

const sortEmptyDesc = selectionSortGen({ array: [], order: 'desc' });
it('selection-sort: DESC Empty []', () => {
  expect(sortEmptyDesc.next().value).toEqual({
    arr: [],
    state: [],
  } as Res);
});

const sortDescSingle = selectionSortGen({ array: [5], order: 'desc' });

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
])('selection-sort: DESC [5]\narr: $expected.arr\nstate: $expected.state', ({ expected }) => {
  it(`return \narr: [${expected.arr}]  \nstate: [${expected.state}]`, () => {
    expect(sortDescSingle.next().value).toEqual(expected as Res);
  });
});
