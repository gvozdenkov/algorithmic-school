import { FormEvent, useRef, useState } from 'react';
import clsx from 'clsx';

import { HEAD, SHORT_DELAY_IN_MS } from '#shared/constants';
import { sleep } from '#shared/lib';
import { Button, Circle, Input, SolutionLayout } from '#shared/ui';

import { useFocus } from '#shared/hooks';
import { ElementState, ProcessingAction } from '#shared/types';

import { Stack as StackClass } from './lib';
import s from './stack-page.module.scss';

const maxStackSize = 10;

type ProcessingStackAction = Extract<ProcessingAction, 'addToHead' | 'removeFromTail' | 'idle'>;

export const StackPage = () => {
  const [inputValue, setInputValue] = useState('');
  const [stack, setStack] = useState<string[]>([]);
  const [stackState, setStackState] = useState<ElementState[]>([]);

  const [showResult, setShowResult] = useState(false);
  const [processingAction, setProcessingAction] = useState<ProcessingStackAction>('idle');

  const [inputRef, setInputFocus] = useFocus<HTMLInputElement>();
  const stackRef = useRef(new StackClass<string>(maxStackSize));
  const Stack = stackRef.current;

  const stackStateRef = useRef(new StackClass<ElementState>(maxStackSize));
  const StackState = stackStateRef.current;

  const stackSize = Stack.getStack().length;

  const isProcessing = processingAction !== 'idle';
  const isButtonAddDisabled = !inputValue || stackSize >= maxStackSize;
  const isButtonDeleteDisabled = isProcessing || stackSize === 0;

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  };

  const handlePush = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setProcessingAction('addToHead');
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

    setProcessingAction('idle');
    setInputFocus();
  };

  const handlePop = async () => {
    setProcessingAction('removeFromTail');
    setStack(Stack.getStack());
    StackState.pop();
    StackState.push('changing');
    setStackState(StackState.getStack());

    await sleep(300);

    Stack.pop();
    StackState.pop();
    setStackState(StackState.getStack());
    setStack(Stack.getStack());

    setProcessingAction('idle');
    setInputFocus();
  };

  const handleClear = () => {
    Stack.clearStack();
    StackState.clearStack();
    setStack([]);
    setStackState([]);
    setInputFocus();
  };

  const head = (i: number) => i === stackSize - 1 && HEAD;

  return (
    <SolutionLayout title='Стек'>
      <form className={s.form} onSubmit={(e) => void handlePush(e)}>
        <Input
          value={inputValue}
          maxLength={3}
          isLimitText
          onChange={handleChange}
          disabled={isProcessing}
          extraClass={s.form__input}
          autoComplete='off'
          ref={inputRef}
          autoFocus
          data-test='input'
        />
        <Button
          text='Добавить'
          isLoader={processingAction === 'addToHead'}
          disabled={isButtonAddDisabled}
          type='submit'
          extraClass={s.addBtn}
          data-test='add-btn'
        />
        <Button
          text='Удалить'
          isLoader={processingAction === 'removeFromTail'}
          onClick={() => void handlePop()}
          disabled={isButtonDeleteDisabled}
          type='button'
          extraClass={s.deleteBtn}
          data-test='remove-btn'
        />
        <Button
          text='Очистить'
          type='button'
          onClick={handleClear}
          disabled={isButtonDeleteDisabled}
          extraClass={s.clearBtn}
          data-test='clear-btn'
        />
      </form>
      {showResult && (
        <ul className={clsx(s.resultList)}>
          {stack.map((elem, i) => (
            <li key={i}>
              <Circle
                letter={elem}
                index={i}
                state={stackState[i]}
                head={head(i)}
                data-test={`circle-${i}`}
              />
            </li>
          ))}
        </ul>
      )}
    </SolutionLayout>
  );
};
