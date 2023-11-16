import { getStateArray, swap } from '#shared/lib';
import { ElementState, StateGenerator } from '#shared/types';
import { SortProps } from './types';

export function* selectionSortGen<T extends string | number>({
  array,
  order = 'desc',
}: SortProps<T>): IterableIterator<StateGenerator<T>> {
  const arr = [...array];
  const length = arr.length;
  let state: ElementState[] = getStateArray(length);

  yield {
    arr,
    state,
  };

  for (let i = 0; i < length; i++) {
    let compare = i;

    for (let j = i + 1; j < length; j++) {
      state = state.map<ElementState>((_, index) =>
        i > 0 && index < i ? 'modified' : index === i || index === j ? 'changing' : 'default',
      );

      yield {
        arr,
        state,
      };

      compare = order === 'asc' && arr[j] < arr[compare] ? j : compare;
      compare = order === 'desc' && arr[j] > arr[compare] ? j : compare;
    }

    compare !== i && swap(arr, i, compare);
    state = state.map<ElementState>((_, index) => (index <= i ? 'modified' : 'default'));

    yield {
      arr,
      state,
    };
  }
}
