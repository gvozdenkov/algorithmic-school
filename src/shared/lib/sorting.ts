import { SortDirection } from '#shared/types/types';
import { Dispatch, SetStateAction } from 'react';
import { sleep } from '.';
import { swap } from '.';

export const generateRandomArray = (n: number, max: number = 100) =>
  [...Array(n)].map(() => Math.floor(max * Math.random()));

export const randomIntFromInterval = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);

type Sort<T> = {
  array: T[];
  setArray?: Dispatch<SetStateAction<T[]>>;
  order?: SortDirection;
  setFirstElement?: Dispatch<SetStateAction<number>>;
  setSecondElement?: Dispatch<SetStateAction<number>>;
  delay?: number;
};

/**
 * @function
 * @name selectionSort
 * Selection sort algorithm
 * @example
 * const arr = [3, 1, 2]
 * selectionSort({ arr, order: 'asc' });
 * console.log(arr) // [1, 2, 3]
 * @param {{arr: T[], order: SortDirection}}
 */

export const selectionSort = async <T>({
  array,
  setArray,
  order = 'asc',
  setFirstElement,
  setSecondElement,
  delay = 0,
}: Sort<T>) => {
  let _array = [...array];

  for (let i = 0; i < _array.length - 1; i++) {
    setFirstElement && setFirstElement(i);
    let maxInd = i;
    for (let j = i + 1; j < _array.length; j++) {
      setSecondElement && setSecondElement(j);
      maxInd = order === 'desc' && _array[j] > _array[maxInd] ? j : maxInd;
      maxInd = order === 'asc' && _array[j] < _array[maxInd] ? j : maxInd;
      sleep && (await sleep(delay));
    }
    _array = swap(_array, maxInd, i);
    setArray && setArray(_array);
  }

  return _array;
};

/**
 * @function
 * @name bubbleSort
 * Bubble sort algorithm
 * @example
 * const arr = [3, 1, 2]
 * bubbleSort({ arr, order: 'asc' });
 * console.log(arr) // [1, 2, 3]
 * @param {{arr: T[], order: SortDirection}}
 */
export const bubbleSort = async <T>({
  array,
  setArray,
  order = 'asc',
  setFirstElement,
  setSecondElement,
  delay = 0,
}: Sort<T>) => {
  let _array = [...array];

  for (let i = 0; i < _array.length; i++) {
    for (let j = 0; j < _array.length - -1; j++) {
      setFirstElement && setFirstElement(i);
      setSecondElement && setSecondElement(j + 1);
      if (
        (order === 'asc' && _array[j] > _array[j + 1]) ||
        (order === 'desc' && _array[j] < _array[j + 1])
      ) {
        _array = swap(_array, j, j + 1);
        setArray && setArray(_array);
      }

      sleep && (await sleep(delay));
    }
  }

  return _array;
};

type ReversArray<T> = {
  array: T[];
  setArray?: Dispatch<SetStateAction<T[]>>;
  setStartIndex?: Dispatch<SetStateAction<number>>;
  setEndIndex?: Dispatch<SetStateAction<number>>;
  delay?: number;
};

export const reversArray = async <T>({
  array,
  setArray,
  setStartIndex,
  setEndIndex,
  delay = 0,
}: ReversArray<T>) => {
  let _array = [...array];
  let start = 0;
  let end = array.length - 1;

  while (start <= end) {
    setStartIndex && setStartIndex(start);
    setEndIndex && setEndIndex(end);
    delay && (await sleep(delay));
    _array = swap(_array, start, end);
    setArray && setArray(_array);
    start++;
    end--;
  }
};
