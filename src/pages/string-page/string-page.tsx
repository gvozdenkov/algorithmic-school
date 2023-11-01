import { FormEvent, useState } from 'react';
import clsx from 'clsx';
import s from './string-page.module.scss';

import { SolutionLayout } from '#shared/ui/solution-layout';
import { Input } from '#shared/ui/input';
import { Button } from '#shared/ui/button';
import { Circle } from '#shared/ui/circle';
import { reversArray } from '#shared/lib';
import { DELAY_IN_MS } from '#shared/constants/delays';
import { setState } from './utils';

export const StringComponent = () => {
  const [inputValue, setInputValue] = useState('');
  const [stringArr, setStringArr] = useState(['']);

  const [showResult, setShowResult] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(0);

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    const char = e.currentTarget.value;

    setInputValue(char);
    setStringArr(char.split(''));
    setShowResult(false);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsProcessing(true);
    setShowResult(true);

    await reversArray({
      array: stringArr,
      setArray: setStringArr,
      setStartIndex,
      setEndIndex,
      delay: DELAY_IN_MS,
    });

    setStartIndex(stringArr.length);
    setEndIndex(stringArr.length);
    setIsProcessing(false);
  };

  return (
    <SolutionLayout title="Строка">
      <form className={s.form} onSubmit={handleSubmit}>
        <Input
          value={inputValue}
          maxLength={11}
          isLimitText
          onChange={handleChange}
          autoComplete="off"
          disabled={isProcessing}
        />
        <Button
          text="Развернуть"
          type="submit"
          isLoader={isProcessing}
          disabled={isProcessing || !inputValue}
        />
      </form>
      {showResult && (
        <ul className={clsx(s.result__list, 'mt-24')}>
          {stringArr.map((letter, i) => (
            <li className={s.result__listItem} key={i}>
              <Circle state={setState(startIndex, endIndex, i)} letter={letter} />
            </li>
          ))}
        </ul>
      )}
    </SolutionLayout>
  );
};
