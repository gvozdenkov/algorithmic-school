import { DataItem, ElementStates } from '#shared/types';

type Stack<T> = {
  push: (item: T) => void;
  pop: () => void;
  peak: () => T | null;
  setState: (state: ElementStates) => void;
  getStack: () => T[];
  clearStack: () => void;
};

export function StackFactory<T>(): Stack<DataItem<T>> {
  let stack: DataItem<T>[] = [];

  const getSize = () => stack.length;

  const getStack = () => stack;

  const clearStack = () => (stack = []);

  const setState = (state: ElementStates) => {
    const headIndex = getSize() - 1;
    stack[headIndex] = { value: stack[headIndex].value, state };
  };

  const push = (item: DataItem<T>) =>
    stack.push({
      value: item.value,
      state: item.state || 'changing',
    });

  const pop = () => (getSize() ? stack.pop() : undefined);

  const peak = () => stack[getSize() - 1] || null;

  return { push, pop, peak, setState, getStack, clearStack };
}
