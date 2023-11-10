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

import { LinkedList, getState } from './lib';
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
const initialListLength = 3;

const initialList: string[] = [...Array(initialListLength)].map((_, i) => i.toString());

export const ListPage = () => {
  const [inputValue, setInputValue] = useState('');
  const [inputIndex, setInputIndex] = useState<string>('');
  const [list, setList] = useState<string[]>(['']);
  const [actionIndex, setActionIndex] = useState<number | null>(null);

  const [inputValueRef, setInputValueFocus] = useFocus<HTMLInputElement>();
  const [inputIndexRef, setInputIndexFocus] = useFocus<HTMLInputElement>();

  const [processingAction, setProcessingAction] = useState<ProcessingAction>('idle');

  const linkListRef = useRef(LinkedList<string>());
  const LinkList = linkListRef.current;

  const listLength = list.length;

  const isProcessing = processingAction !== 'idle';

  const isAddButtonDisabled = !inputValue || isProcessing || listLength >= maxListLength;
  const isAddByIndexButtonDisabled = isAddButtonDisabled || !inputIndex || +inputIndex > listLength;
  const isRemoveButtonDisabled = isProcessing || !listLength;
  const isRemoveByIndexButtonDisabled =
    isRemoveButtonDisabled || !inputIndex || +inputIndex >= listLength;

  useEffect(() => {
    initialList.map((elem) => LinkList.append(elem));
    setList(LinkList.toArray());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChangeValue = (e: FormEvent<HTMLInputElement>) =>
    setInputValue(e.currentTarget.value);

  const handleChangeIndex = (e: FormEvent<HTMLInputElement>) =>
    e.currentTarget.validity.valid && setInputIndex(e.currentTarget.value);

  const handleAppend = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setProcessingAction('addToTail');

    await sleep(DELAY_IN_MS);

    LinkList.append(inputValue);
    setList(LinkList.toArray());

    setProcessingAction('idle');
    setInputValueFocus();
  };

  const handlePrepend = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setProcessingAction('addToHead');

    await sleep(DELAY_IN_MS);

    LinkList.prepend(inputValue);
    setList(LinkList.toArray());

    setProcessingAction('idle');
    setInputValueFocus();
  };

  const handleDeleteHead = async () => {
    setProcessingAction('removeFromHead');

    await sleep(DELAY_IN_MS);

    LinkList.deleteHead();
    setList(LinkList.toArray());

    setProcessingAction('idle');
  };

  const handleDeleteTail = async () => {
    setProcessingAction('removeFromTail');

    await sleep(DELAY_IN_MS);

    LinkList.deleteTail();
    setList(LinkList.toArray());

    setProcessingAction('idle');
  };

  const handleRemoveAt = async () => {
    setProcessingAction('removeByIndex');

    for (let i = 0; i <= +inputIndex; i++) {
      setActionIndex(i);
      await sleep(DELAY_IN_MS);
    }

    LinkList.removeAt(+inputIndex);
    setList(LinkList.toArray());

    setActionIndex(null);
    setProcessingAction('idle');
    setInputValue('');
    setInputIndex('');
    setInputIndexFocus();
  };

  const handleInsertAt = async () => {
    setProcessingAction('addByIndex');

    for (let i = 0; i <= +inputIndex; i++) {
      setActionIndex(i);
      await sleep(DELAY_IN_MS);
    }

    LinkList.insertAt(+inputIndex, inputValue);
    setList(LinkList.toArray());

    setProcessingAction('final');
    await sleep(DELAY_IN_MS);

    setProcessingAction('idle');
    setActionIndex(null);
    setInputValue('');
    setInputIndex('');
    setInputIndexFocus();
  };

  const InsertedElement = () => {
    const value = processingAction.includes('add') ? inputValue : list[+inputIndex];

    return <Circle letter={value} state="changing" isSmall />;
  };

  const getCircleState = getState({
    list: LinkList,
    Element: InsertedElement(),
    initialListLength,
    action: processingAction,
    targetIndex: +inputIndex,
  });

  return (
    <SolutionLayout title="Связный список">
      <form className={s.form}>
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
          type="submit"
          onClick={handlePrepend}
          extraClass={clsx(s.form__button)}
        />
        <Button
          text="Добавить в tail"
          isLoader={processingAction === 'addToTail'}
          disabled={isAddButtonDisabled}
          onClick={handleAppend}
          type="submit"
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

        <Input
          type="number"
          placeholder="Введите индекс"
          value={inputIndex}
          min={0}
          maxLength={listLength}
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
      </form>
      {
        <ul className={clsx(s.resultList, 'mt-24')}>
          {list.map((elem, i, arr) => {
            const lastIndex = arr.length - 1;
            const { state, insert } = getCircleState({
              index: i,
              currentIndex: actionIndex,
            });

            const head = () => {
              if (processingAction.includes('add')) return insert;

              if (i === 0) return 'head';
            };

            const tail = () => {
              if (processingAction.includes('remove')) return insert;

              if (i === lastIndex) return 'tail';
            };

            return (
              <li className={s.resultList__item} key={i}>
                <Circle
                  letter={elem}
                  index={i}
                  state={state}
                  head={head()}
                  tail={tail()}
                  extraClass={clsx(
                    s.circle,
                    { [s.circle_first]: i === 0 },
                    { [s.circle_last]: i === lastIndex }
                  )}
                />
                {i < lastIndex && <ArrowIcon fill={colorSwitch(state)} />}
              </li>
            );
          })}
        </ul>
      }
    </SolutionLayout>
  );
};
