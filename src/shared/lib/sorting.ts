import { SortDirection } from '#types/direction';
import { Dispatch, SetStateAction } from 'react';
import { sleep } from '.';

/**
 * @function
 * @name swap
 * Swap elements in the array. The original array mutates
 * @example
 * const arr = [1, 2, 3]
 * swap(arr, 0, 2);
 * console.log(arr) // [3, 2, 1]
 * @param {Array} arr
 * @param {Number} first
 * @param {Number} second
 */
const swap = <T>(arr: T[], first: number, second: number) => {
  const tmp = arr[first];
  arr[first] = arr[second];
  arr[second] = tmp;
};

// /**
//  * @function
//  * @name selectionSort
//  * Selection sort algorithm
//  * @example
//  * const arr = [3, 1, 2]
//  * selectionSort({ arr, order: 'asc' });
//  * console.log(arr) // [1, 2, 3]
//  * @param {{arr: T[], order: SortDirection}}
//  */

type SelectionSort<T> = {
  arr: T[];
  order?: SortDirection;
  setFirstElement?: Dispatch<SetStateAction<number>>;
  setSecondElement?: Dispatch<SetStateAction<number>>;
  delay?: number;
};

export const selectionSort = async <T>({
  arr,
  order = 'asc',
  setFirstElement,
  setSecondElement,
  delay = 0,
}: SelectionSort<T>) => {
  for (let i = 0; i < arr.length - 1; i++) {
    let maxInd = i;
    for (let j = i + 1; j < arr.length; j++) {
      maxInd = order === 'desc' && arr[j] > arr[maxInd] ? j : maxInd;
      maxInd = order === 'asc' && arr[j] < arr[maxInd] ? j : maxInd;
    }
    sleep && (await sleep(delay));
    swap(arr, maxInd, i);
  }
};

type ReversArray<T> = {
  array: T[];
  setStartIndex?: Dispatch<SetStateAction<number>>;
  setEndIndex?: Dispatch<SetStateAction<number>>;
  delay?: number;
};

export const reversArray = async <T>({
  array,
  setStartIndex,
  setEndIndex,
  delay = 0,
}: ReversArray<T>) => {
  let start = 0;
  let end = array.length - 1;
  while (start <= end) {
    setStartIndex && setStartIndex(start);
    setEndIndex && setEndIndex(end);
    delay && (await sleep(delay));
    swap(array, start, end);
    start++;
    end--;
  }
};
