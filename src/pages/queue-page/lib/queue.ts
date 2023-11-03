import { DataItem, ElementStates } from '#shared/types';

type Queue<T> = {
  enqueue: (item: T) => void;
  dequeue: () => void;
  peak: () => T | undefined;
  setState: (position: 'enqueue' | 'dequeue', state: ElementStates) => void;
  getQueue: () => (T | undefined)[];
  getQueueLength: () => number;
  getHead: () => number;
  getTail: () => number;
  clearQueue: () => void;
};

export function QueueFactory<T>(size: number): Queue<DataItem<T>> {
  const queueSize = size;
  let queue: (DataItem<T> | undefined)[] = [...Array(size)];
  let head = 0;
  let tail = 0;
  let length = 0;

  const getQueueLength = () =>
    queue.reduce((acc, curr) => (curr !== undefined ? (acc += 1) : (acc += 0)), 0);
  const getHead = (): number => head;
  const getTail = (): number => tail;

  const isEmpty = (): boolean => getQueueLength() === 0;

  const enqueue = (item: DataItem<T>) => {
    if (length >= queueSize) {
      throw new Error('Maximum length exceeded');
    }

    queue[tail] = {
      value: item.value,
      state: item.state || 'changing',
    };

    tail < queueSize - 1 ? (tail += 1) : (tail = 0);
    length++;
  };

  const dequeue = () => {
    if (isEmpty()) {
      throw new Error('No elements in the queue');
    }

    queue[head] = undefined;
    head < queueSize - 1 ? (head += 1) : (head = 0);
    length--;

    if (isEmpty()) {
      head = 0;
      tail = 0;
      length = 0;
    }
  };

  const getQueue = () => queue;

  const clearQueue = () => {
    queue = [...Array(size)];
    head = 0;
    tail = 0;
    length = 0;
  };

  const setState = (position: 'enqueue' | 'dequeue', state: ElementStates) => {
    if (position === 'enqueue' && tail > 0 && tail < queueSize) {
      queue[tail - 1]!.state = state;
    } else if (position === 'enqueue' && tail === 0) {
      queue[queueSize - 1]!.state = state;
    }

    if (position === 'dequeue' && !isEmpty()) {
      queue[head]!.state = state;
    }
  };

  const peak = () => {
    if (isEmpty()) {
      throw new Error('No elements in the queue');
    }

    return queue[head];
  };

  return {
    enqueue,
    dequeue,
    peak,
    getQueue,
    setState,
    clearQueue,
    getQueueLength,
    getHead,
    getTail,
  };
}
