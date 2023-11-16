type Node<T> = {
  value: T;
  next?: Node<T> | null;
  prev?: Node<T> | null;
};

type LinkedListClass<T> = {
  append: (value: T) => Node<T>;
  prepend: (value: T) => Node<T>;
  insertAt: (index: number, value: T) => Node<T>;
  removeAt: (index: number) => Node<T> | null;
  removeHead: () => Node<T> | null;
  removeTail: () => Node<T> | null;
  removeAll: () => void;
  getSize: () => number;
  toArray: <K>(callback?: (x: Node<T>) => K) => (K | T)[];
};

type IsOutOfRangeErrorProps = {
  index: number;
  max: number;
  error: string;
};

export class LinkedList<T> implements LinkedListClass<T> {
  private head: Node<T> | null = null;
  private tail: Node<T> | null = null;
  private size: number = 0;

  private CreateNode = <T>({ value, next = null, prev = null }: Node<T>): Node<T> => ({
    value,
    next,
    prev,
  });

  private isOutOfRangeError = ({ index, max, error }: IsOutOfRangeErrorProps): void => {
    if (index < 0 || index > max) {
      throw new Error(error);
    }
  };

  private findNodeByIndex = (index: number): Node<T> | undefined => {
    if (!this.head || !this.tail || index < 0 || index > this.size) return undefined;

    let findNode: Node<T> = this.head;
    let findIndex = 0;

    while (findIndex < index) {
      findNode = findNode.next!;
      findIndex++;
    }

    return findNode;
  };

  insertAt = (index: number, value: T): Node<T> => {
    this.isOutOfRangeError({
      index,
      max: this.size,
      error: `Can't insert at ${index} index: out of range`,
    });

    // add the 1st element
    if (!this.head || !this.tail) {
      const node = this.CreateNode({ value });
      [this.head, this.tail] = [node, node];
      this.size++;
      return this.head;
    }

    // prepend
    if (index === 0) {
      const node = this.CreateNode({ value, next: this.head });
      [this.head.prev, this.head] = [node, node];
      this.size++;
      return this.head;
    }

    // append
    if (index === this.size) {
      const node = this.CreateNode({ value, prev: this.tail });
      [this.tail.next, this.tail] = [node, node];
      this.size++;
      return this.tail;
    }

    // insert at index
    const indexNode: Node<T> = this.findNodeByIndex(index)!;
    const prevNode = indexNode.prev!;
    const node = this.CreateNode({ value, next: indexNode, prev: prevNode });
    [prevNode.next, indexNode.prev] = [node, node];

    this.size++;

    return node;
  };

  removeAt = (index: number): Node<T> | null => {
    const laseIndex = this.size - 1;

    this.isOutOfRangeError({
      index,
      max: laseIndex,
      error: `Can't remove at ${index} index: out of range`,
    });

    // list is empty
    if (!this.head || !this.tail) return null;

    // delete head
    if (index === 0) {
      const removedHead = this.head;
      [this.head, this.head.prev] = [this.head.next!, null];
      this.size--;
      return removedHead;
    }

    // delete tail
    if (index === laseIndex) {
      const removedTail = this.tail;
      [this.tail, this.tail.next] = [this.tail.prev!, null];
      this.size--;
      return removedTail;
    }

    // remove at index
    const removedNode: Node<T> = this.findNodeByIndex(index)!;
    const prevNode = removedNode.prev!;
    const nextNode = removedNode.next!;
    [prevNode.next, nextNode.prev] = [nextNode, prevNode];

    this.size--;
    return removedNode;
  };

  removeAll = () => {
    this.head = null;
    this.tail = null;
    this.size = 0;
  };

  prepend = (value: T): Node<T> => this.insertAt(0, value);

  append = (value: T): Node<T> => this.insertAt(this.size, value);

  removeHead = (): Node<T> | null => this.removeAt(0);

  removeTail = (): Node<T> | null => this.removeAt(this.size - 1);

  toArray = <K>(callback?: (x: Node<T>) => K): (K | T)[] => {
    if (!this.head || !this.tail) return [];

    let currNode = this.head;
    let value: K | T;
    const res: (K | T)[] = [];

    if (callback) {
      while (currNode) {
        value = callback(currNode);
        res.push(value);
        currNode = currNode.next!;
      }
    } else {
      while (currNode) {
        value = currNode.value;
        res.push(value);
        currNode = currNode.next!;
      }
    }

    return res;
  };

  getSize = (): number => this.size;
}
