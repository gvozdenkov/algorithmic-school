import { FormEvent, useRef, useState } from 'react';
import clsx from 'clsx';

import { DataItem } from '#shared/types';
import { SolutionLayout } from '#shared/ui/solution-layout';
import { Input } from '#shared/ui/input';
import { Button } from '#shared/ui/button';
import { Circle } from '#shared/ui/circle';
import { sleep } from '#shared/lib';
import { SHORT_DELAY_IN_MS } from '#shared/constants/delays';
import { useFocus } from '#shared/hooks';

import { QueueFactory } from './lib';
import s from './queue-page.module.scss';

const maxQueueLength = 7;
const initialQueue: DataItem<string>[] = [...Array(maxQueueLength)].map(() => ({
  value: '',
  state: 'default',
}));

export const QueuePage = () => {
  const [inputValue, setInputValue] = useState('');
  const [queue, setQueue] = useState<(DataItem<string> | undefined)[]>(initialQueue);

  const [isProcessing, setIsProcessing] = useState(false);

  const [inputRef, setInputFocus] = useFocus<HTMLInputElement>();
  const queueRef = useRef(QueueFactory<string>(maxQueueLength));
  const Queue = queueRef.current;

  const queueLength = Queue.getQueueLength();

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

    Queue.enqueue({ value: inputValue });
    setQueue(Queue.getQueue());
    setInputValue('');

    await sleep(SHORT_DELAY_IN_MS);

    Queue.setState('enqueue', 'default');
    setQueue(Queue.getQueue());
    setIsProcessing(false);

    setInputFocus();
  };

  const handlePop = async () => {
    setIsProcessing(true);

    Queue.setState('dequeue', 'changing');
    setQueue(Queue.getQueue());

    await sleep(SHORT_DELAY_IN_MS);

    Queue.dequeue();
    setQueue(Queue.getQueue());

    setIsProcessing(false);
    setInputFocus();
  };

  const showHead = (i: number): string | false =>
    Queue.getQueueLength() > 0 && i === Queue.getHead() && 'head';

  const showTail = (i: number): string | false | undefined => {
    if (Queue.getQueueLength() > 0 && i === Queue.getTail() - 1) return 'tail';

    // for last position in queue
    if (Queue.getQueueLength() > 0 && Queue.getTail() === 0 && i === maxQueueLength - 1)
      return 'tail';
  };

  return (
    <SolutionLayout title="Очередь">
      <form className={s.form} onSubmit={handlePush}>
        <Input
          value={inputValue}
          maxLength={4}
          isLimitText
          onChange={handleChange}
          disabled={isProcessing}
          extraClass={s.form__input}
          autoComplete="off"
          autoFocus
          ref={inputRef}
        />
        <Button
          text="Добавить"
          isLoader={isProcessing}
          disabled={!inputValue || queueLength === maxQueueLength}
          type="submit"
          extraClass="ml-6"
        />
        <Button
          text="Удалить"
          onClick={handlePop}
          disabled={!queueLength}
          type="button"
          extraClass="ml-6"
        />
        <Button
          text="Очистить"
          type="button"
          onClick={handleClear}
          disabled={isProcessing || !queueLength}
          extraClass="ml-auto"
        />
      </form>
      {
        <ul className={clsx(s.result__list, 'mt-24')}>
          {queue.map((elem, i) => (
            <li className={s.result__listItem} key={i}>
              <Circle
                letter={elem?.value}
                index={i}
                state={elem?.state}
                head={showHead(i)}
                tail={showTail(i)}
              />
            </li>
          ))}
        </ul>
      }
    </SolutionLayout>
  );
};
