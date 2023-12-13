import { FormEvent, useState } from 'react';

import clsx from 'clsx';

import { SHORT_DELAY_IN_MS } from '#shared/constants';
import { useFocus } from '#shared/hooks';
import { sleep } from '#shared/lib';

import { Button, Circle, Input, SolutionLayout } from '#shared/ui';

import { fibonacci } from './lib';

import s from './fibonacci-page.module.scss';

export const FibonacciPage = () => {
  const [inputValue, setInputValue] = useState('');
  const [fibArray, setFibArray] = useState<number[]>([]);

  const [showResult, setShowResult] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const [inputValueRef, setInputValueFocus] = useFocus<HTMLInputElement>();

  const isButtonDisabled = isProcessing || !inputValue || +inputValue > 19;

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    const char = e.currentTarget.value.replace(/[^\d]/, '');
    setInputValue(char);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsProcessing(true);
    setShowResult(true);

    const fibGenerator = fibonacci(+inputValue);

    for (const fib of fibGenerator) {
      setFibArray(fib);
      await sleep(SHORT_DELAY_IN_MS);
    }

    setIsProcessing(false);
    setInputValue('');
    setInputValueFocus();
  };

  return (
    <SolutionLayout title='Последовательность Фибоначчи'>
      <form className={s.form} onSubmit={(e) => void handleSubmit(e)}>
        <Input
          type='number'
          placeholder='Введите число'
          value={inputValue}
          maxLength={19}
          max={19}
          isLimitText
          onChange={(e) => handleChange(e)}
          disabled={isProcessing}
          ref={inputValueRef}
          autoFocus
          data-test='input'
        />
        <Button
          text='Рассчитать'
          type='submit'
          isLoader={isProcessing}
          disabled={isButtonDisabled}
          data-test='button'
        />
      </form>
      {showResult && (
        <ul className={clsx(s['result-list'], 'mt-24')}>
          {fibArray.map((letter, i) => (
            <li key={i}>
              <Circle
                state='default'
                letter={letter.toString()}
                index={i}
                data-test={`circle-${i}`}
              />
            </li>
          ))}
        </ul>
      )}
    </SolutionLayout>
  );
};
