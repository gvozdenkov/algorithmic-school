import { FormEvent, useState } from 'react';
import clsx from 'clsx';

import { SolutionLayout } from '#shared/ui/solution-layout';
import { Input } from '#shared/ui/input';
import { Button } from '#shared/ui/button';
import { Circle } from '#shared/ui/circle';

import s from './stack-page.module.scss';
import { ColorState } from '#types/direction';
import { sleep } from '#shared/lib';

type Stack = {
  value: string;
  state: ColorState;
};

export const StackPage = () => {
  const [inputValue, setInputValue] = useState('');
  const [stack, setStack] = useState<Stack[]>([]);

  const [showResult, setShowResult] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  };

  const handlePush = async () => {
    setIsProcessing(true);
    setShowResult(true);
    setStack([...stack, { value: inputValue, state: 'changing' }]);
    setInputValue('');

    await sleep(300);

    setStack([...stack, { value: inputValue, state: 'default' }]);
    setIsProcessing(false);
  };

  const handlePop = async () => {
    setIsProcessing(true);
    const lastIndex = stack.length - 1;
    setStack([...stack.slice(0, lastIndex), { ...stack[lastIndex], state: 'changing' }]);

    await sleep(300);

    const _stack = [...stack];
    _stack.pop();
    setStack(_stack);
    setIsProcessing(false);
  };

  const handleClear = () => {
    setStack([]);
  };

  const head = (i: number) => i === stack.length - 1 && 'head';

  return (
    <SolutionLayout title="Стек">
      <form className={s.form}>
        <Input
          value={inputValue}
          maxLength={4}
          isLimitText
          onChange={handleChange}
          disabled={isProcessing}
          extraClass={s.form__input}
          autoComplete="off"
        />
        <Button
          text="Добавить"
          onClick={handlePush}
          isLoader={isProcessing}
          disabled={!inputValue}
          type="button"
          extraClass="ml-6"
        />
        <Button text="Удалить" onClick={handlePop} type="button" extraClass="ml-6" />
        <Button
          text="Очистить"
          type="button"
          onClick={handleClear}
          isLoader={isProcessing}
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
