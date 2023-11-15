import { FormEvent, useRef, useState } from 'react';
import clsx from 'clsx';

import { Button, Circle, Input, SolutionLayout } from '#shared/ui';

import { sleep } from '#shared/lib';
import { SHORT_DELAY_IN_MS } from '#shared/constants';
import { useFocus } from '#shared/hooks';
import { AnimationState } from '#shared/types';

import { QueueFactory, setHead, setState, setTail } from './lib';
import s from './queue-page.module.scss';

const maxQueueSize = 8;
const initialQueue: string[] = [...Array(maxQueueSize)];

export const QueuePage = () => {
  const [inputValue, setInputValue] = useState('');
  const [queue, setQueue] = useState<(string | undefined)[]>(initialQueue);
  const [animationState, setAnimationState] = useState<AnimationState>('idle');

  const [isProcessing, setIsProcessing] = useState(false);

  const [inputRef, setInputFocus] = useFocus<HTMLInputElement>();

  const queueRef = useRef(QueueFactory<string>(maxQueueSize));
  const Queue = queueRef.current;

  const queueLength = Queue.getLength();

  const setQueueState = setState(Queue);
  const setQueueHead = setHead(Queue);
  const setQueueTail = setTail(Queue);

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  };

  const handleClear = () => {
    Queue.clearQueue();
    setQueue(initialQueue);
    setInputValue('');
    setInputFocus();
  };

  const handlePush = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsProcessing(true);

    Queue.enqueue(inputValue);
    setQueue(Queue.getQueue());
    setAnimationState('add');
    setInputValue('');

    await sleep(SHORT_DELAY_IN_MS);

    setAnimationState('idle');
    setIsProcessing(false);
    setInputFocus();
  };

  const handlePop = async () => {
    setIsProcessing(true);

    setQueue(Queue.getQueue());
    setAnimationState('delete');

    await sleep(SHORT_DELAY_IN_MS);

    Queue.dequeue();
    setQueue(Queue.getQueue());
    setAnimationState('idle');

    setIsProcessing(false);
    setInputFocus();
  };

  return (
    <SolutionLayout title='Очередь'>
      <form className={s.form} onSubmit={handlePush}>
        <Input
          value={inputValue}
          maxLength={4}
          isLimitText
          onChange={handleChange}
          disabled={isProcessing}
          extraClass={s.form__input}
          autoComplete='off'
          ref={inputRef}
          autoFocus
        />
        <Button
          text='Добавить'
          isLoader={isProcessing}
          disabled={!inputValue || queueLength === maxQueueSize}
          type='submit'
          extraClass='ml-6'
        />
        <Button
          text='Удалить'
          onClick={handlePop}
          disabled={!queueLength}
          type='button'
          extraClass='ml-6'
        />
        <Button
          text='Очистить'
          type='button'
          onClick={handleClear}
          disabled={isProcessing || !queueLength}
          extraClass='ml-auto'
        />
      </form>
      {
        <ul className={clsx(s.resultList, 'mt-24')}>
          {queue.map((elem, i) => (
            <li className={s.resultList__item} key={i}>
              <Circle
                letter={elem}
                index={i}
                state={setQueueState(animationState, i)}
                head={setQueueHead(i)}
                tail={setQueueTail(i)}
              />
            </li>
          ))}
        </ul>
      }
    </SolutionLayout>
  );
};
