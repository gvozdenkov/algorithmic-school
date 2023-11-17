type Stack<T> = {
  push: (item: T) => void;
  pop: () => void;
  peak: () => T | null;
  getStack: () => T[];
  clearStack: () => void;
};

export function StackFactory<T>(size: number): Stack<T> {
  let stack: T[] = [];

  const getSize = () => stack.length;

  const getStack = (): T[] => stack;

  const clearStack = () => (stack = []);

  const push = (item: T) => (getSize() < size ? stack.push(item) : null);

  const pop = () => (getSize() ? stack.pop() : undefined);

  const peak = () => stack[getSize() - 1] || null;

  return { push, pop, peak, getStack, clearStack };
}
