import { FormEvent, useEffect, useRef, useState } from 'react';

import clsx from 'clsx';

import { DELAY_IN_MS, HEAD, TAIL } from '#shared/constants';
import { useFocus } from '#shared/hooks';
import { colorSwitch, sleep } from '#shared/lib';
import { ElementState, ProcessingAction } from '#shared/types';

import { ArrowIcon, Button, Circle, Input, SolutionLayout } from '#shared/ui';

import { LinkedListClass } from './lib';

import s from './list-page.module.scss';

const maxListLength = 8;
const initialListLength = 4;

const initialList: string[] = [...Array<string>(initialListLength)].map((_, i) => i.toString());

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

  const linkListRef = useRef(new LinkedListClass<string>());
  const LinkList = linkListRef.current;

  const listLength = list.length;

  const isProcessing = processingAction !== 'idle';

  const isAddButtonDisabled = !inputValue || listLength >= maxListLength;
  const isAddByIndexButtonDisabled =
    isAddButtonDisabled || !inputIndexStr || inputIndex >= listLength;

  const isRemoveButtonDisabled = !listLength;
  const isRemoveByIndexButtonDisabled =
    isRemoveButtonDisabled || !inputIndexStr || inputIndex >= listLength;

  useEffect(() => {
    initialList.map((elem) => LinkList.append(elem));
    setList(LinkList.toArray());

    return () => LinkList.removeAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setProcessingSteps = async (): Promise<void> => {
    for (let i = 0; i <= inputIndex; i++) {
      setProcessingIndex(i);
      await sleep(DELAY_IN_MS);
    }
  };

  const setFinalStageAnimation = (stage: ProcessingAction | null) => {
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

  const handleChangeValue = (e: FormEvent<HTMLInputElement>) =>
    setInputValue(e.currentTarget.value);

  const handleChangeIndex = (e: FormEvent<HTMLInputElement>) =>
    e.currentTarget.validity.valid && setInputIndex(e.currentTarget.value);

  const handleAppend = async () => {
    setProcessingAction('addToTail');

    await sleep(DELAY_IN_MS);

    LinkList.append(inputValue);
    setList(LinkList.toArray());

    setFinalStageAnimation('addToTail');
    await sleep(DELAY_IN_MS);

    resetStates();
    setInputValueFocus();
  };

  const handlePrepend = async () => {
    setProcessingAction('addToHead');

    await sleep(DELAY_IN_MS);

    LinkList.prepend(inputValue);
    setList(LinkList.toArray());

    setFinalStageAnimation('addToHead');
    await sleep(DELAY_IN_MS);

    resetStates();
    setInputValueFocus();
  };

  const handleDeleteHead = async () => {
    setProcessingAction('removeFromHead');

    await sleep(DELAY_IN_MS);

    LinkList.removeHead();
    setList(LinkList.toArray());

    setFinalStageAnimation('removeFromHead');

    resetStates();
    setInputIndexFocus();
  };

  const handleDeleteTail = async () => {
    setProcessingAction('removeFromTail');

    await sleep(DELAY_IN_MS);

    LinkList.removeTail();
    setList(LinkList.toArray());

    setFinalStageAnimation('removeFromTail');

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
    setList(LinkList.toArray());

    setFinalStageAnimation('removeByIndex');
    await sleep(DELAY_IN_MS);

    resetStates();
    setInputIndexFocus();
  };

  const handleInsertAt = async () => {
    setProcessingAction('addByIndex');

    await setProcessingSteps();

    LinkList.insertAt(inputIndex, inputValue);
    setList(LinkList.toArray());

    setFinalStageAnimation('addByIndex');
    await sleep(DELAY_IN_MS);

    resetStates();
    setInputValueFocus();
  };

  const InsertedElement = (value: string, testName?: string) => (
    <Circle letter={value} state='changing' isSmall data-test={`circle-${testName}`} />
  );

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
      return InsertedElement(list[inputIndex], 'tail');

    if (i === listLength - 1) return TAIL;

    return null;
  };

  const headState = (i: number) => {
    // add to tail
    if (processingAction === 'addToTail' && i === listLength - 1)
      return InsertedElement(inputValue);

    // add to head
    if (processingAction === 'addToHead' && i === 0) return InsertedElement(inputValue);
    if (finalStage === 'addToHead' && processingAction === 'final' && i === 0) return HEAD;

    // insert at index
    if (
      processingAction === 'addByIndex' &&
      i <= inputIndex &&
      processingIndex !== null &&
      i === processingIndex
    )
      return InsertedElement(inputValue, 'head');

    if (finalStage === 'addByIndex' && processingAction === 'final' && i !== 0) return '';

    return i === 0 && HEAD;
  };

  return (
    <SolutionLayout title='Связный список'>
      <form className={s.form}>
        <fieldset
          className={clsx(s.form__fieldset, s.form__fieldset_type_byValue)}
          disabled={isProcessing}>
          <Input
            value={inputValue}
            maxLength={4}
            isLimitText
            onChange={handleChangeValue}
            disabled={processingAction !== 'idle'}
            extraClass={clsx(s.form__input, s.form__input_type_value)}
            autoComplete='off'
            autoFocus
            ref={inputValueRef}
            data-test='inputValue'
          />
          <Button
            text='Добавить в head'
            isLoader={processingAction === 'addToHead'}
            disabled={isAddButtonDisabled}
            onClick={() => void handlePrepend()}
            extraClass={clsx(s.form__button, s['form__button_type_add-to-head'])}
            data-test='addHeadBtn'
          />
          <Button
            text='Добавить в tail'
            isLoader={processingAction === 'addToTail'}
            disabled={isAddButtonDisabled}
            onClick={() => void handleAppend()}
            extraClass={clsx(s.form__button, s['form__button_type_add-to-tail'])}
            data-test='addTailBtn'
          />
          <Button
            text='Удалить из head'
            isLoader={processingAction === 'removeFromHead'}
            onClick={() => void handleDeleteHead()}
            disabled={isRemoveButtonDisabled}
            extraClass={clsx(s.form__button, s['form__button_type_remove-from-head'])}
            data-test='removeHeadBtn'
          />
          <Button
            text='Удалить из tail'
            isLoader={processingAction === 'removeFromTail'}
            onClick={() => void handleDeleteTail()}
            disabled={isRemoveButtonDisabled}
            extraClass={clsx(s.form__button, s['form__button_type_remove-from-tail'])}
            data-test='removeTailBtn'
          />
        </fieldset>
        <fieldset
          className={clsx(s.form__fieldset, s.form__fieldset_type_byIndex)}
          disabled={isProcessing}>
          <Input
            type='number'
            placeholder='Введите индекс'
            value={inputIndexStr}
            min={0}
            maxLength={listLength - 1}
            pattern='\d+'
            isLimitText
            onChange={handleChangeIndex}
            disabled={processingAction !== 'idle'}
            extraClass={clsx(s.form__input, s.form__input_type_index)}
            autoComplete='off'
            autoFocus
            ref={inputIndexRef}
            data-test='inputIndex'
          />
          <Button
            text='Добавить по индексу'
            isLoader={processingAction === 'addByIndex'}
            disabled={isAddByIndexButtonDisabled}
            onClick={() => void handleInsertAt()}
            extraClass={clsx(s.form__button, s['form__button_type_add-by-index'])}
            data-test='addByIndexBtn'
          />
          <Button
            text='Удалить по индексу'
            isLoader={processingAction === 'removeByIndex'}
            onClick={() => void handleRemoveAt()}
            disabled={isRemoveByIndexButtonDisabled}
            extraClass={clsx(s.form__button, s['form__button_type_remove-by-index'])}
            data-test='removeByIndexBtn'
          />
        </fieldset>
      </form>
      {
        <ul className={clsx(s['result-list'], 'mt-24')}>
          {list.map((_, i) => {
            const lastIndex = listLength - 1;

            return (
              <li className={s['result-list__item']} key={i}>
                {i > 0 && i <= lastIndex && <ArrowIcon fill={colorSwitch(colorState(i))} />}
                <Circle
                  letter={letterState(i)}
                  index={i}
                  state={colorState(i)}
                  head={headState(i)}
                  tail={tailState(i)}
                  extraClass={clsx(
                    s.circle,
                    { [s.circle_first]: i === 0 },
                    { [s.circle_last]: i === lastIndex },
                  )}
                  data-test={`circle-${i}`}
                />
              </li>
            );
          })}
        </ul>
      }
    </SolutionLayout>
  );
};
