import { ReactElement } from 'react';
import { LinkedListReturn } from '.';
import { ElementState } from '#shared/types';
import { ProcessingAction } from '../list-page';

type GetStateProps1<T> = {
  list: LinkedListReturn<T>;
  Element: ReactElement;
  initialListLength: number;
  action: ProcessingAction;
  targetIndex: number;
};

type GetStateProps2 = {
  index: number;
  currentIndex: number | null;
};

export const getState =
  <T>({ list, initialListLength, Element, action, targetIndex }: GetStateProps1<T>) =>
  ({ index, currentIndex }: GetStateProps2) => {
    const length = list.getSize() ?? initialListLength;

    type InsertArr = 'head' | ReactElement | undefined;

    const startCondition = (i: number): boolean =>
      currentIndex !== null && currentIndex !== undefined && i <= currentIndex;

    let insertArr: InsertArr[] = [];
    let stateArr: ElementState[] = [];

    stateArr = [...Array(length)].map<ElementState>((_, i) =>
      startCondition(i) ? 'changing' : 'default'
    );

    if (action.includes('add')) {
      insertArr = [...Array(length)].map<ReactElement | undefined>((_, i) =>
        startCondition(i) && i === currentIndex ? Element : undefined
      );
    } else if (action.includes('remove')) {
      insertArr = [...Array(length)].map<ReactElement | undefined>((_, i) =>
        currentIndex !== null && currentIndex !== undefined && i === targetIndex
          ? Element
          : undefined
      );
    }

    if (action === 'final' && index === targetIndex) {
      [stateArr[index], insertArr[index]] = ['modified', undefined];
    }

    if (action === 'idle') {
      [stateArr[0], insertArr[0]] = ['default', 'head'];
    }

    return {
      state: stateArr[index],
      insert: insertArr[index],
    };
  };
