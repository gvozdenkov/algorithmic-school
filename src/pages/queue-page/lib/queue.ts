export type Queue<T> = {
  enqueue: (item: T) => void;
  dequeue: () => void;
  peak: () => T | undefined;
  getQueue: () => (T | undefined)[];
  getLength: () => number;
  getHead: () => number;
  getTail: () => number;
  clearQueue: () => void;
};

export function QueueFactory<T>(size: number): Queue<T> {
  let queue: (T | undefined)[] = [...Array(size)];
  let head = 0;
  let tail = -1;
  let length = 0;

  const getLength = (): number => length;
  const getHead = (): number => head % size;
  const getTail = (): number => (tail === -1 ? 0 : tail % size);

  const isEmpty = (): boolean => getLength() === 0;

  const enqueue = (item: T): void => {
    if (length >= size) {
      throw new Error('Maximum length exceeded');
    }

    tail = tail % size === -1 ? 0 : tail + 1;
    queue[tail % size] = item;

    length++;
  };

  const dequeue = (): void => {
    if (isEmpty()) {
      throw new Error('No elements in the queue');
    }

    queue[head % size] = undefined;
    length--;
    head = !length ? 0 : head + 1;
    tail = !length ? -1 : tail;
  };

  const peak = (): T | undefined => {
    if (isEmpty()) {
      throw new Error('No elements in the queue');
    }

    return queue[head];
  };

  const getQueue = (): (T | undefined)[] => queue;

  const clearQueue = (): void => {
    queue = [...Array(size)];
    head = 0;
    tail = -1;
    length = 0;
  };

  return {
    enqueue,
    dequeue,
    peak,
    getQueue,
    clearQueue,
    getLength,
    getHead,
    getTail,
  };
}
