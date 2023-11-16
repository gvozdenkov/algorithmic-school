import { FormEvent, MouseEvent, useEffect, useState } from 'react';
import clsx from 'clsx';

import { Button, Column, RadioInput, SolutionLayout } from '#shared/ui';

import { generateRandomArray, randomIntFromInterval, sleep } from '#shared/lib';
import { ElementState, SortDirection } from '#shared/types';
import { SHORT_DELAY_IN_MS } from '#shared/constants';
import { bubbleSortGen, selectionSortGen } from './lib';

import s from './sorting-page.module.scss';

type SortMethod = 'selectionSort' | 'bubbleSort';
type SortingState = 'idle' | 'processing' | 'finished';

const minArrLen = 5;
const maxArrLen = 17;
const maxValue = 60;

const randomArr = () => {
  const arrLength = randomIntFromInterval(minArrLen, maxArrLen);
  return generateRandomArray(arrLength, maxValue);
};

export const SortingPage = () => {
  const [array, setArray] = useState<number[]>([]);
  const [sortMethod, setSortMethod] = useState<SortMethod>('selectionSort');
  const [sortDirection, setSortDirection] = useState<SortDirection | undefined>(undefined);
  const [state, setState] = useState<ElementState[]>([]);
  const [sortingState, setSortingState] = useState<SortingState>('idle');

  const isProcessing = sortingState === 'processing';

  useEffect(() => {
    handleNewRandomArr();
  }, []);

  const handleNewRandomArr = () => {
    setArray(randomArr());
    setState([]);
  };

  const selectionSort = (order: SortDirection) =>
    selectionSortGen({
      array,
      order,
    });

  const bubbleSort = (order: SortDirection) =>
    bubbleSortGen({
      array,
      order,
    });

  const sorter = {
    selectionSort,
    bubbleSort,
  };

  const handleSetSortMethod = (e: FormEvent<HTMLInputElement>) =>
    setSortMethod(e.currentTarget.value as SortMethod);

  const handleSorting = async (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    const order = e.currentTarget.value as SortDirection;
    setSortDirection(e.currentTarget.value as SortDirection);
    setSortingState('processing');

    const sortStateGenerator = sorter[sortMethod](order);

    for (const sortState of sortStateGenerator) {
      setArray(sortState.arr);
      setState(sortState.state);
      await sleep(SHORT_DELAY_IN_MS);
    }

    setSortingState('finished');
    setSortDirection(undefined);
  };

  return (
    <SolutionLayout title='Сортировка массива'>
      <form className={s.form}>
        <RadioInput
          label='Выбор'
          name='sortMethod'
          value='selectionSort'
          checked={sortMethod === 'selectionSort'}
          onChange={handleSetSortMethod}
          disabled={isProcessing}
        />
        <RadioInput
          label='Пузырёк'
          name='sortMethod'
          value='bubbleSort'
          checked={sortMethod === 'bubbleSort'}
          onChange={handleSetSortMethod}
          extraClass='ml-20'
          disabled={isProcessing}
        />
        <Button
          text='По возрастанию'
          sorting='asc'
          value='asc'
          onClick={handleSorting}
          type='button'
          isLoader={isProcessing && sortDirection === 'asc'}
          disabled={isProcessing}
          extraClass={clsx('ml-40', s.form__button)}
        />
        <Button
          text='По убыванию'
          sorting='desc'
          value='desc'
          onClick={handleSorting}
          type='button'
          isLoader={isProcessing && sortDirection === 'desc'}
          disabled={isProcessing}
          extraClass={clsx('ml-6', s.form__button)}
        />
        <Button
          text='Новый массив'
          type='button'
          onClick={handleNewRandomArr}
          disabled={isProcessing}
          extraClass={clsx('ml-40', s.form__button)}
        />
      </form>
      <ul className={clsx(s.resultList, 'mt-24')}>
        {array.map((elem, i) => (
          <li className={s.resultList__item} key={i}>
            <Column index={elem} state={state[i]} />
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
