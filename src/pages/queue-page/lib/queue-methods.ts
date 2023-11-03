import { ElementStates } from '#shared/types';

export type Queue<T> = {
  value: T | undefined;
  state: ElementStates;
};

export function getQueueLength<T>(stack: Queue<T>[]): number {
  return stack.reduce((acc, curr) => (curr.value ? ++acc : (acc += 0)), 0);
}

export const pushToQueue = <T>(
  stack: Queue<T>[],
  headIndex: number,
  value: T,
  state: ElementStates
) => [...stack.slice(0, headIndex), { value, state }, ...stack.slice(headIndex + 1, stack.length)];

export const popFromQueue = <T>(
  stack: Queue<T>[],
  tailIndex: number,
  value: T,
  state: ElementStates
) => [
  ...stack.slice(0, tailIndex),
  {
    ...stack[tailIndex],
    value,
    state,
  },
  ...stack.slice(tailIndex + 1, stack.length),
];
