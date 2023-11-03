import { FormEvent, MouseEvent, useState } from 'react';
import clsx from 'clsx';

import { SolutionLayout } from '#shared/ui/solution-layout';
import { Button } from '#shared/ui/button';
import { RadioInput } from '#shared/ui/radio-input';
import { Column } from '#shared/ui/column';
import { bubbleSort, generateRandomArray, randomIntFromInterval, selectionSort } from '#shared/lib';
import { SortDirection } from '#shared/types/types';
import { getBubbleSortStates } from './utils';

import s from './sorting-page.module.scss';
import { SHORT_DELAY_IN_MS } from '#shared/constants/delays';

type SortMethod = 'select' | 'bubble';

export const SortingPage = () => {
  const [array, setArray] = useState<number[]>([]);
  const [sortMethod, setSortMethod] = useState<SortMethod>('select');

  const [showResult, setShowResult] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const minArrLen = 3;
  const maxArrLen = 17;
  const maxValue = 100;

  const handleSetSortMethod = (e: FormEvent<HTMLInputElement>) =>
    setSortMethod(e.currentTarget.value as SortMethod);

  const randomArr = () => {
    const arrLength = randomIntFromInterval(minArrLen, maxArrLen);
    const arr = generateRandomArray(arrLength, maxValue);
    setArray(arr);
    setShowResult(true);
  };

  const handleSorting = async (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    const order = e.currentTarget.value as SortDirection;

    setIsProcessing(true);
    setShowResult(true);

    const arr = [3, 2, 5];
    console.log(arr);

    const sortConfig = {
      array: arr,
      order,
    };

    // getBubbleSortStates(sortConfig);
    console.log(getBubbleSortStates(sortConfig));

    // if (sortMethod === 'select') {
    //   await selectionSort(sortConfig);
    // } else {
    //   await bubbleSort(sortConfig);
    // }

    setIsProcessing(false);
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <form className={s.form}>
        <RadioInput
          label="Выбор"
          name="sortMethod"
          value="select"
          checked={sortMethod === 'select'}
          onChange={handleSetSortMethod}
        />
        <RadioInput
          label="Пузырёк"
          name="sortMethod"
          value="bubble"
          checked={sortMethod === 'bubble'}
          onChange={handleSetSortMethod}
          extraClass="ml-20"
        />
        <Button
          text="По возрастанию"
          sorting="asc"
          value="asc"
          onClick={handleSorting}
          type="button"
          extraClass="ml-40"
        />
        <Button
          text="По убыванию"
          sorting="desc"
          value="desc"
          onClick={handleSorting}
          type="button"
          extraClass="ml-6"
        />
        <Button
          text="Новый массив"
          type="button"
          onClick={randomArr}
          isLoader={isProcessing}
          disabled={isProcessing}
          extraClass="ml-40"
        />
      </form>
      {showResult && (
        <ul className={clsx(s.result__list, 'mt-24')}>
          {array.map((elem, i) => (
            <li className={s.result__listItem} key={i}>
              <Column index={elem} state={'default'} />
            </li>
          ))}
        </ul>
      )}
    </SolutionLayout>
  );
};
