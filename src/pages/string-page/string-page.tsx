import { FormEvent, useState } from 'react';
import clsx from 'clsx';
import s from './string-page.module.scss';

import { Button, Circle, Input, SolutionLayout } from '#shared/ui';
import { DELAY_IN_MS } from '#shared/constants';
import { reversArrayGen } from './utils';
import { ElementState } from '#shared/types';
import { sleep } from '#shared/lib';
import { useFocus } from '#shared/hooks';

export const StringComponent = () => {
  const [inputValue, setInputValue] = useState('');

  const [stringArr, setStringArr] = useState(['']);
  const [state, setState] = useState<ElementState[]>([]);

  const [showResult, setShowResult] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const [inputRef, setInputFocus] = useFocus<HTMLInputElement>();

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

    const reverseStateGenerator = reversArrayGen(stringArr);

    for (const reverseState of reverseStateGenerator) {
      setStringArr(reverseState.arr);
      setState(reverseState.state);
      await sleep(DELAY_IN_MS);
    }

    setIsProcessing(false);
    setInputFocus();
  };

  return (
    <SolutionLayout title='Строка'>
      <form className={s.form} onSubmit={handleSubmit}>
        <Input
          value={inputValue}
          maxLength={11}
          isLimitText
          onChange={handleChange}
          autoComplete='off'
          disabled={isProcessing}
          autoFocus
          ref={inputRef}
        />
        <Button
          text='Развернуть'
          type='submit'
          isLoader={isProcessing}
          disabled={isProcessing || !inputValue}
        />
      </form>
      {showResult && (
        <ul className={clsx(s.result__list, 'mt-24')}>
          {stringArr.map((letter, i) => (
            <li className={s.result__listItem} key={i}>
              <Circle state={state[i]} letter={letter} />
            </li>
          ))}
        </ul>
      )}
    </SolutionLayout>
  );
};
