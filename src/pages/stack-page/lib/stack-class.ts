type StackClass<T> = {
  push: (item: T) => void;
  pop: () => void;
  peak: () => T | null;
  getStack: () => T[];
  clearStack: () => void;
};

export class Stack<T> implements StackClass<T> {
  constructor(size: number) {
    this.size = size;
  }

  private stack: T[] = [];
  private size = 0;

  getSize = () => this.stack.length;

  getStack = (): T[] => this.stack;

  clearStack = () => (this.stack = []);

  push = (item: T) => (this.getSize() < this.size ? this.stack.push(item) : null);

  pop = () => (this.getSize() ? this.stack.pop() : undefined);

  peak = () => this.stack[this.getSize() - 1] || null;
}
