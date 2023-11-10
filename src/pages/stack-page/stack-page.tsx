import { FormEvent, useRef, useState } from 'react';
import clsx from 'clsx';

import { SHORT_DELAY_IN_MS } from '#shared/constants/delays';
import { sleep } from '#shared/lib';
import { SolutionLayout } from '#shared/ui/solution-layout';
import { Input } from '#shared/ui/input';
import { Button } from '#shared/ui/button';
import { Circle } from '#shared/ui/circle';
import { useFocus } from '#shared/hooks';
import { ElementState } from '#shared/types';

import { StackFactory } from './lib';
import s from './stack-page.module.scss';

const maxStackSize = 10;

export const StackPage = () => {
  const [inputValue, setInputValue] = useState('');
  const [stack, setStack] = useState<string[]>([]);
  const [stackState, setStackState] = useState<ElementState[]>([]);

  const [showResult, setShowResult] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const [inputRef, setInputFocus] = useFocus<HTMLInputElement>();
  const stackRef = useRef(StackFactory<string>(maxStackSize));
  const Stack = stackRef.current;

  const stackStateRef = useRef(StackFactory<ElementState>(maxStackSize));
  const StackState = stackStateRef.current;

  const stackSize = Stack.getStack().length;

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  };

  const handlePush = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsProcessing(true);
    setShowResult(true);

    Stack.push(inputValue);
    StackState.push('changing');
    setStack(Stack.getStack());
    setStackState(StackState.getStack());

    setInputValue('');

    await sleep(SHORT_DELAY_IN_MS);

    setStack(Stack.getStack());
    StackState.pop();
    StackState.push('default');
    setStackState(StackState.getStack());

    setIsProcessing(false);
    setInputFocus();
  };

  const handlePop = async () => {
    setIsProcessing(true);
    setStack(Stack.getStack());
    StackState.pop();
    StackState.push('changing');
    setStackState(StackState.getStack());

    await sleep(300);

    Stack.pop();
    StackState.pop();
    setStackState(StackState.getStack());
    setStack(Stack.getStack());

    setIsProcessing(false);
    setInputFocus();
  };

  const handleClear = () => {
    Stack.clearStack();
    StackState.clearStack();
    setStack([]);
    setStackState([]);
    setInputFocus();
  };

  const head = (i: number) => i === stackSize - 1 && 'head';

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
          disabled={!inputValue || stackSize >= maxStackSize}
          type="submit"
          extraClass="ml-6"
        />
        <Button
          text="Удалить"
          onClick={handlePop}
          disabled={isProcessing || stackSize === 0}
          type="button"
          extraClass="ml-6"
        />
        <Button
          text="Очистить"
          type="button"
          onClick={handleClear}
          disabled={isProcessing || stackSize === 0}
          extraClass="ml-auto"
        />
      </form>
      {showResult && (
        <ul className={clsx(s.result__list, 'mt-24')}>
          {stack.map((elem, i) => (
            <li className={s.result__listItem} key={i}>
              <Circle letter={elem} index={i} state={stackState[i]} head={head(i)} />
            </li>
          ))}
        </ul>
      )}
    </SolutionLayout>
  );
};
