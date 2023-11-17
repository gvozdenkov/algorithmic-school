import { getStateArray, swap } from '#shared/lib';
import { ElementState, StateGenerator } from '#shared/types';
import { SortProps } from './types';

export function* bubbleSortGen<T extends string | number>({
  array,
  order = 'asc',
}: SortProps<T>): IterableIterator<StateGenerator<T>> {
  const arr = [...array];
  const length = arr.length;
  let state: ElementState[] = getStateArray(length);

  for (let i = 0; i < length; i++) {
    state = state.map<ElementState>((_, index) =>
      i > 0 && index > length - i - 1 ? 'modified' : 'default',
    );

    yield {
      arr,
      state,
    };

    for (let j = 0; j < length - i - 1; j++) {
      state = state.map<ElementState>((_, index) =>
        i > 0 && index > length - i - 1
          ? 'modified'
          : index === j || index === j + 1
          ? 'changing'
          : 'default',
      );

      yield {
        arr,
        state,
      };

      if ((order === 'asc' && arr[j] > arr[j + 1]) || (order === 'desc' && arr[j] < arr[j + 1])) {
        swap(arr, j, j + 1);
      }
    }
  }

  yield {
    arr,
    state: getStateArray(length, 'modified'),
  };
}
