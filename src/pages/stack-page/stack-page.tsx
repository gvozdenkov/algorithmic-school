import { FormEvent, useMemo, useRef, useState } from 'react';
import clsx from 'clsx';

import { DataItem } from '#shared/types';
import { SHORT_DELAY_IN_MS } from '#shared/constants/delays';
import { sleep } from '#shared/lib';

import { SolutionLayout } from '#shared/ui/solution-layout';
import { Input } from '#shared/ui/input';
import { Button } from '#shared/ui/button';
import { Circle } from '#shared/ui/circle';

import { StackFactory } from './lib';
import s from './stack-page.module.scss';

export const StackPage = () => {
  const [inputValue, setInputValue] = useState('');
  const [stack, setStack] = useState<DataItem<string>[]>([]);

  const [showResult, setShowResult] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const inputRef = useRef(null);
  const stackRef = useRef(StackFactory<string>());
  const Stack = stackRef.current;

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  };

  const handlePush = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsProcessing(true);
    setShowResult(true);

    Stack.push({ value: inputValue });
    setStack(Stack.getStack());

    setInputValue('');

    await sleep(SHORT_DELAY_IN_MS);

    Stack.setState('default');
    setStack(Stack.getStack());

    setIsProcessing(false);
  };

  const handlePop = async () => {
    setIsProcessing(true);
    Stack.setState('changing');
    setStack(Stack.getStack());

    await sleep(300);

    Stack.pop();
    setStack(Stack.getStack());
    setIsProcessing(false);
  };

  const handleClear = () => {
    Stack.clearStack();
    setStack([]);
  };

  const head = (i: number) => i === stack.length - 1 && 'head';

  return (
    <SolutionLayout title="Стек">
      <form className={s.form} onSubmit={handlePush}>
        <Input
          value={inputValue}
          maxLength={4}
          isLimitText
          onChange={handleChange}
          disabled={isProcessing}
          extraClass={s.form__input}
          autoComplete="off"
          ref={inputRef}
        />
        <Button
          text="Добавить"
          isLoader={isProcessing}
          disabled={!inputValue}
          type="submit"
          extraClass="ml-6"
        />
        <Button text="Удалить" onClick={handlePop} type="button" extraClass="ml-6" />
        <Button
          text="Очистить"
          type="button"
          onClick={handleClear}
          disabled={isProcessing}
          extraClass="ml-auto"
        />
      </form>
      {showResult && (
        <ul className={clsx(s.result__list, 'mt-24')}>
          {stack.map((elem, i) => (
            <li className={s.result__listItem} key={i}>
              <Circle letter={elem.value} index={i} state={elem.state} head={head(i)} />
            </li>
          ))}
        </ul>
      )}
    </SolutionLayout>
  );
};
