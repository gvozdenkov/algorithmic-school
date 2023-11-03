import { swap } from '#shared/lib';
import { ElementStates, SortDirection } from '#shared/types';

type Sort = {
  array: number[];
  order: SortDirection;
};

type ArrayState = {
  value: number;
  state: ElementStates;
};

export const getBubbleSortStates = ({ array, order = 'asc' }: Sort) => {
  let arrayStates: ArrayState[][] = [];
  const arrayState: ArrayState[] = array.map((x) => ({
    value: x,
    state: 'default',
  }));

  arrayStates.push([...arrayState]);

  let _arrayState = [...arrayState];
  console.log('arrayStates', arrayStates);

  for (let i = array.length; i >= 0; i--) {
    console.log('i', i);
    for (let j = 0; j < i; j++) {
      // _arrayState[j] = { value: _arrayState[j].value, state: 'changing' };
      // _arrayState[j + 1] = { value: _arrayState[j + 1].value, state: 'changing' };
      // arrayStates.push([..._arrayState]);
      if (
        (order === 'asc' && _arrayState[j].value > _arrayState[j + 1].value) ||
        (order === 'desc' && _arrayState[j].value < _arrayState[j + 1].value)
      ) {
        // _arrayState[j] = { value: _arrayState[j].value, state: 'changing' };
        // _arrayState[j + 1] = { value: _arrayState[j + 1].value, state: 'changing' };
        const t = swap(_arrayState, j, j + 1);
        console.log('t', t);
        arrayStates.push([...t]);
        console.log('arrayStates', arrayStates);
      }

      // _arrayState[j] = { value: _arrayState[j].value, state: 'default' };
      // _arrayState[j + 1] = { value: _arrayState[j + 1].value, state: 'default' };
      // arrayStates.push([..._arrayState]);
    }
    _arrayState[i - 1] = { value: _arrayState[i - 1].value, state: 'modified' };
    arrayStates.push([..._arrayState]);
  }

  return arrayStates;
};
