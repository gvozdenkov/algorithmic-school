import { Queue as QueueClass } from '.';

export class Queue<T> implements QueueClass<T> {
  constructor(size: number) {
    this.size = size;
    this.queue = [...Array<undefined>(size)];
  }

  private head = 0;
  private tail = -1;
  private length = 0;
  private size = 0;
  private queue: (T | undefined)[] = [];

  getLength = (): number => this.length;
  getHead = (): number => this.head % this.size;
  getTail = (): number => (this.tail === -1 ? 0 : this.tail % this.size);

  private isEmpty = (): boolean => this.getLength() === 0;

  enqueue = (item: T): void => {
    if (this.length >= this.size) {
      throw new Error('Maximum length exceeded');
    }

    this.tail = this.tail % this.size === -1 ? 0 : this.tail + 1;
    this.queue[this.tail % this.size] = item;

    this.length++;
  };

  dequeue = (): void => {
    if (this.isEmpty()) {
      throw new Error('No elements in the queue');
    }

    this.queue[this.head % this.size] = undefined;
    this.length--;

    this.head = !this.length ? 0 : this.head + 1;
    this.tail = !this.length ? -1 : this.tail;
  };

  peak = (): T | undefined => {
    if (this.isEmpty()) {
      throw new Error('No elements in the queue');
    }

    return this.queue[this.head];
  };

  getQueue = (): (T | undefined)[] => this.queue;

  clearQueue = (): void => {
    this.queue = [...Array<undefined>(this.size)];
    this.head = 0;
    this.tail = -1;
    this.length = 0;
  };
}
