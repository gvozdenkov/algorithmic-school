import { FormEvent, useState } from 'react';
import clsx from 'clsx';

import { Button, Circle, Input, SolutionLayout } from '#shared/ui';
import { SHORT_DELAY_IN_MS } from '#shared/constants';
import { sleep } from '#shared/lib';
import { useFocus } from '#shared/hooks';

import s from './fibonacci-page.module.scss';
import { fibonacci } from './lib';

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
      <form className={s.form} onSubmit={handleSubmit}>
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
        />
        <Button
          text='Рассчитать'
          type='submit'
          isLoader={isProcessing}
          disabled={isButtonDisabled}
        />
      </form>
      {showResult && (
        <ul className={clsx(s.resultList, 'mt-24')}>
          {fibArray.map((letter, i) => (
            <li className={s.resultList__item} key={i}>
              <Circle state='default' letter={letter.toString()} index={i} />
            </li>
          ))}
        </ul>
      )}
    </SolutionLayout>
  );
};
