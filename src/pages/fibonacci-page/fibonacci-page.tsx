import { FormEvent, useState } from 'react';
import clsx from 'clsx';

import { SolutionLayout } from '#shared/ui/solution-layout';
import { Input } from '#shared/ui/input';
import { Button } from '#shared/ui/button';
import { Circle } from '#shared/ui/circle';
import { SHORT_DELAY_IN_MS } from '#shared/constants/delays';
import { getFibonacciArray, sleep } from '#shared/lib';

import s from './fibonacci-page.module.scss';

export const FibonacciPage = () => {
  const [inputValue, setInputValue] = useState('');
  const [fibArray, setFibArray] = useState<number[]>([]);
  const [visibleIndex, setVisibleIndex] = useState(0);

  const [showResult, setShowResult] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    const char = e.currentTarget.value;

    setInputValue(char.replace(/[^\d]/, ''));
    setShowResult(false);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsProcessing(true);
    setShowResult(true);
    setFibArray(getFibonacciArray(+inputValue));

    for (let i = 0; i <= fibArray.length; i++) {
      setVisibleIndex(i);
      await sleep(SHORT_DELAY_IN_MS);
    }

    setIsProcessing(false);
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={s.form} onSubmit={handleSubmit}>
        <Input
          type="number"
          placeholder="Введите число"
          value={inputValue}
          maxLength={19}
          max={19}
          isLimitText
          onChange={handleChange}
          disabled={isProcessing}
        />
        <Button
          text="Развернуть"
          type="submit"
          isLoader={isProcessing}
          disabled={(isProcessing && !inputValue) || +inputValue > 19}
        />
      </form>
      {showResult && (
        <ul className={clsx(s.result__list, 'mt-24')}>
          {fibArray.map((letter, i) => (
            <li className={s.result__listItem} key={i}>
              <Circle
                state="default"
                letter={letter.toString()}
                index={i}
                extraClass={clsx({ [s.circle_invisible]: i > visibleIndex })}
              />
            </li>
          ))}
        </ul>
      )}
    </SolutionLayout>
  );
};
