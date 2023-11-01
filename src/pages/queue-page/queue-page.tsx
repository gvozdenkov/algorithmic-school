import { FormEvent, useRef, useState } from 'react';
import clsx from 'clsx';

import { SolutionLayout } from '#shared/ui/solution-layout';
import { Input } from '#shared/ui/input';
import { Button } from '#shared/ui/button';
import { Circle } from '#shared/ui/circle';
import { sleep } from '#shared/lib';
import { Queue, getQueueLength, popFromQueue, pushToQueue } from './lib';
import { SHORT_DELAY_IN_MS } from '#shared/constants/delays';

import s from './queue-page.module.scss';

const maxQueueLength = 7;
const initialQueue: Queue<string | undefined>[] = [...Array(maxQueueLength)].map(() => ({
  value: undefined,
  state: 'default',
}));

export const QueuePage = () => {
  const [inputValue, setInputValue] = useState('');
  const [queue, setQueue] = useState<Queue<string | undefined>[]>(initialQueue);

  const [headIndex, setHeadIndex] = useState(0);
  const [tailIndex, setTailIndex] = useState(0);

  const [isProcessing, setIsProcessing] = useState(false);

  const ref = useRef<HTMLInputElement>(null);

  const queueLength = getQueueLength(queue);

  const setHead = (i: number) => i === headIndex - 1 && 'head';
  const setTail = (i: number) => i === tailIndex && 'tail';

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  };

  const handleClear = () => {
    setQueue(initialQueue);
    setHeadIndex(0);
    setTailIndex(0);
  };

  const handlePush = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsProcessing(true);

    setQueue(pushToQueue(queue, headIndex, inputValue, 'changing'));
    setHeadIndex(headIndex + 1);
    setInputValue('');

    await sleep(SHORT_DELAY_IN_MS);

    setQueue(pushToQueue(queue, headIndex, inputValue, 'default'));
    setIsProcessing(false);

    ref.current?.focus();
  };

  const handlePop = async () => {
    setIsProcessing(true);
    setQueue(popFromQueue(queue, tailIndex, undefined, 'changing'));

    await sleep(SHORT_DELAY_IN_MS);

    setQueue(popFromQueue(queue, tailIndex, undefined, 'default'));
    setTailIndex(tailIndex + 1);
    setIsProcessing(false);

    if (queueLength === 1) {
      handleClear();
    }
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
          ref={ref}
        />
        <Button
          text="Добавить"
          isLoader={isProcessing}
          disabled={!inputValue || headIndex === maxQueueLength}
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
                letter={elem.value}
                index={i}
                state={elem.state}
                head={!!headIndex && setHead(i)}
                tail={!!headIndex && setTail(i)}
              />
            </li>
          ))}
        </ul>
      }
    </SolutionLayout>
  );
};
