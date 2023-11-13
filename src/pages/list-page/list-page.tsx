import { FormEvent, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

import { SolutionLayout } from '#shared/ui/solution-layout';
import { Input } from '#shared/ui/input';
import { Button } from '#shared/ui/button';
import { Circle } from '#shared/ui/circle';
import { ArrowIcon } from '#shared/ui/icons';
import { colorSwitch, sleep } from '#shared/lib';
import { DELAY_IN_MS } from '#shared/constants/delays';
import { useFocus } from '#shared/hooks';
import { ElementState } from '#shared/types';

import { LinkedList, Node } from './lib';
import s from './list-page.module.scss';

export type ProcessingAction =
  | 'addToHead'
  | 'addToTail'
  | 'addByIndex'
  | 'removeFromHead'
  | 'removeFromTail'
  | 'removeByIndex'
  | 'final'
  | 'idle';

const maxListLength = 8;
const initialListLength = 4;

const initialList: string[] = [...Array(initialListLength)].map((_, i) => i.toString());

export const ListPage = () => {
  const [inputValue, setInputValue] = useState('');
  const [inputIndexStr, setInputIndex] = useState<string>('');
  const inputIndex = +inputIndexStr;
  const [list, setList] = useState(initialList);

  const [processingIndex, setProcessingIndex] = useState<number | null>(null);
  const [processingAction, setProcessingAction] = useState<ProcessingAction>('idle');
  const [finalStage, setFinalStage] = useState<ProcessingAction | null>(null);

  const [inputValueRef, setInputValueFocus] = useFocus<HTMLInputElement>();
  const [inputIndexRef, setInputIndexFocus] = useFocus<HTMLInputElement>();

  const linkListRef = useRef(LinkedList<string>());
  const LinkList = linkListRef.current;

  const listLength = list.length;

  const isProcessing = processingAction !== 'idle';

  const isAddButtonDisabled = !inputValue || listLength >= maxListLength;
  const isAddByIndexButtonDisabled =
    isAddButtonDisabled || !inputIndexStr || inputIndex >= listLength;

  const isRemoveButtonDisabled = !listLength;
  const isRemoveByIndexButtonDisabled =
    isRemoveButtonDisabled || !inputIndexStr || inputIndex >= listLength;

  const setProcessingSteps = async (): Promise<void> => {
    for (let i = 0; i <= inputIndex; i++) {
      setProcessingIndex(i);
      await sleep(DELAY_IN_MS);
    }
  };

  const setFinalStageAnimation = async (stage: ProcessingAction | null): Promise<void> => {
    setProcessingAction('final');
    setFinalStage(stage);
  };

  const resetStates = (): void => {
    setProcessingAction('idle');
    setProcessingIndex(null);
    setFinalStage(null);
    setInputValue('');
    setInputIndex('');
  };

  const toArrayCallback = (x: Node<string>) => `${x.value}`;

  useEffect(() => {
    initialList.map((elem) => LinkList.append(elem));
    setList(LinkList.toArray(toArrayCallback));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChangeValue = (e: FormEvent<HTMLInputElement>) =>
    setInputValue(e.currentTarget.value);

  const handleChangeIndex = (e: FormEvent<HTMLInputElement>) =>
    e.currentTarget.validity.valid && setInputIndex(e.currentTarget.value);

  const handleAppend = async () => {
    setProcessingAction('addToTail');

    await sleep(DELAY_IN_MS);

    LinkList.append(inputValue);
    setList(LinkList.toArray(toArrayCallback));

    await setFinalStageAnimation('addToTail');
    await sleep(DELAY_IN_MS);

    resetStates();
    setInputValueFocus();
  };

  const handlePrepend = async () => {
    setProcessingAction('addToHead');

    await sleep(DELAY_IN_MS);

    LinkList.prepend(inputValue);
    setList(LinkList.toArray(toArrayCallback));

    await setFinalStageAnimation('addToHead');
    await sleep(DELAY_IN_MS);

    resetStates();
    setInputValueFocus();
  };

  const handleDeleteHead = async () => {
    setProcessingAction('removeFromHead');

    await sleep(DELAY_IN_MS);

    LinkList.removeHead();
    setList(LinkList.toArray(toArrayCallback));

    await setFinalStageAnimation('removeFromHead');

    resetStates();
    setInputIndexFocus();
  };

  const handleDeleteTail = async () => {
    setProcessingAction('removeFromTail');

    await sleep(DELAY_IN_MS);

    LinkList.removeTail();
    setList(LinkList.toArray(toArrayCallback));

    await setFinalStageAnimation('removeFromTail');

    resetStates();
    setInputIndexFocus();
  };

  const handleRemoveAt = async () => {
    if (inputIndex === listLength - 1) {
      setProcessingAction('removeFromTail');
      setProcessingIndex(inputIndex);
      await sleep(DELAY_IN_MS);
    } else {
      setProcessingAction('removeByIndex');
      await setProcessingSteps();
    }

    LinkList.removeAt(inputIndex);
    setList(LinkList.toArray(toArrayCallback));

    await setFinalStageAnimation('removeByIndex');
    await sleep(DELAY_IN_MS);

    resetStates();
    setInputIndexFocus();
  };

  const handleInsertAt = async () => {
    setProcessingAction('addByIndex');

    await setProcessingSteps();

    LinkList.insertAt(inputIndex, inputValue);
    setList(LinkList.toArray(toArrayCallback));

    await setFinalStageAnimation('addByIndex');
    await sleep(DELAY_IN_MS);

    resetStates();
    setInputValueFocus();
  };

  const InsertedElement = (value: string) => <Circle letter={value} state="changing" isSmall />;

  const colorState = (i: number): ElementState => {
    // add to tail
    if (processingAction === 'addToTail' && i === listLength - 1) return 'changing';
    if (finalStage === 'addToTail' && processingAction === 'final' && i === listLength - 1)
      return 'modified';

    // add to head
    if (processingAction === 'addToHead' && i === 0) return 'changing';
    if (finalStage === 'addToHead' && processingAction === 'final' && i === 0) return 'modified';

    // remove from tail
    if (
      finalStage === 'removeFromTail' &&
      processingAction === 'removeFromTail' &&
      i === listLength - 1
    )
      return 'changing';

    // insert at index
    if (
      processingAction === 'addByIndex' &&
      i <= inputIndex &&
      processingIndex !== null &&
      i < processingIndex
    )
      return 'changing';
    if (finalStage === 'addByIndex' && processingAction === 'final' && i === inputIndex)
      return 'modified';

    // remove at index
    if (
      processingAction === 'removeByIndex' &&
      i <= inputIndex &&
      processingIndex !== null &&
      i <= processingIndex
    )
      return 'changing';

    return 'default';
  };

  const letterState = (i: number): string => {
    if (processingAction === 'removeFromTail' && i === listLength - 1) return '';
    if (processingAction === 'removeFromHead' && i === 0) return '';
    if (
      processingAction === 'removeByIndex' &&
      i === inputIndex &&
      processingIndex !== null &&
      i === processingIndex
    )
      return '';

    return list[i];
  };

  const tailState = (i: number) => {
    // remove from tail
    if (processingAction === 'removeFromTail' && i === listLength - 1)
      return InsertedElement(list[listLength - 1]);

    // remove from head
    if (processingAction === 'removeFromHead' && i === 0) return InsertedElement(list[0]);

    // remove at index
    if (
      processingAction === 'removeByIndex' &&
      i === inputIndex &&
      processingIndex !== null &&
      i === processingIndex
    )
      return InsertedElement(list[inputIndex]);

    if (i === listLength - 1) return 'tail';

    return null;
  };

  const headState = (i: number) => {
    // add to tail
    if (processingAction === 'addToTail' && i === listLength - 1)
      return InsertedElement(inputValue);

    // add to head
    if (processingAction === 'addToHead' && i === 0) return InsertedElement(inputValue);
    if (finalStage === 'addToHead' && processingAction === 'final' && i === 0) return 'head';

    // insert at index
    if (
      processingAction === 'addByIndex' &&
      i <= inputIndex &&
      processingIndex !== null &&
      i === processingIndex
    )
      return InsertedElement(inputValue);

    if (finalStage === 'addByIndex' && processingAction === 'final' && i !== 0) return '';

    return i === 0 && 'head';
  };

  return (
    <SolutionLayout title="Связный список">
      <form className={s.form}>
        <fieldset className={s.form__fieldset} disabled={isProcessing}>
          <Input
            value={inputValue}
            maxLength={4}
            isLimitText
            onChange={handleChangeValue}
            disabled={processingAction !== 'idle'}
            extraClass={s.form__input}
            autoComplete="off"
            autoFocus
            ref={inputValueRef}
          />
          <Button
            text="Добавить в head"
            isLoader={processingAction === 'addToHead'}
            disabled={isAddButtonDisabled}
            type="button"
            onClick={handlePrepend}
            extraClass={clsx(s.form__button)}
          />
          <Button
            text="Добавить в tail"
            isLoader={processingAction === 'addToTail'}
            disabled={isAddButtonDisabled}
            onClick={handleAppend}
            type="button"
            extraClass={clsx(s.form__button)}
          />
          <Button
            text="Удалить из head"
            isLoader={processingAction === 'removeFromHead'}
            onClick={handleDeleteHead}
            disabled={isRemoveButtonDisabled}
            type="button"
            extraClass={clsx(s.form__button)}
          />
          <Button
            text="Удалить из tail"
            isLoader={processingAction === 'removeFromTail'}
            onClick={handleDeleteTail}
            disabled={isRemoveButtonDisabled}
            type="button"
            extraClass={clsx(s.form__button)}
          />
        </fieldset>
        <fieldset className={s.form__fieldset} disabled={isProcessing}>
          <Input
            type="number"
            placeholder="Введите индекс"
            value={inputIndexStr}
            min={0}
            maxLength={listLength - 1}
            pattern="\d+"
            isLimitText
            onChange={handleChangeIndex}
            disabled={processingAction !== 'idle'}
            extraClass={s.form__input}
            autoComplete="off"
            autoFocus
            ref={inputIndexRef}
          />
          <Button
            text="Добавить по индексу"
            isLoader={processingAction === 'addByIndex'}
            disabled={isAddByIndexButtonDisabled}
            onClick={handleInsertAt}
            type="submit"
            extraClass={clsx(s.form__button)}
          />
          <Button
            text="Удалить по индексу"
            isLoader={processingAction === 'removeByIndex'}
            onClick={handleRemoveAt}
            disabled={isRemoveByIndexButtonDisabled}
            type="button"
            extraClass={clsx(s.form__button)}
          />
        </fieldset>
      </form>
      {
        <ul className={clsx(s.resultList, 'mt-24')}>
          {list.map((elem, i) => {
            const lastIndex = listLength - 1;

            return (
              <li className={s.resultList__item} key={i}>
                <Circle
                  letter={letterState(i)}
                  index={i}
                  state={colorState(i)}
                  head={headState(i)}
                  tail={tailState(i)}
                  extraClass={clsx(
                    s.circle,
                    { [s.circle_first]: i === 0 },
                    { [s.circle_last]: i === lastIndex }
                  )}
                />
                {i < lastIndex && <ArrowIcon fill={colorSwitch(colorState(i))} />}
              </li>
            );
          })}
        </ul>
      }
    </SolutionLayout>
  );
};
