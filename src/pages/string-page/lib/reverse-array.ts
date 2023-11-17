import { getStateArray, swap } from '#shared/lib';
import { ElementState, StateGenerator } from '#shared/types';

export function* reversArrayGen<T>(array: T[]): IterableIterator<StateGenerator<T>> {
  const arr = [...array];
  const length = array.length;
  let start = 0;
  let end = length - 1;
  let state: ElementState[] = getStateArray(length);

  yield {
    arr,
    state,
  };

  while (start <= end) {
    state = state.map<ElementState>((_, i) =>
      i === start || i === end ? 'changing' : i < start || i > end ? 'modified' : 'default',
    );

    yield {
      arr,
      state,
    };

    swap(arr, start, end);
    start++;
    end--;
  }

  yield {
    arr,
    state: getStateArray(length, 'modified'),
  };
}
