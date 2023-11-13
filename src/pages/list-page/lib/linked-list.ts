type Node<T> = {
  value: T;
  next?: Node<T> | null;
  prev?: Node<T> | null;
};

export type LinkedListReturn<T> = {
  append: (value: T) => Node<T>;
  prepend: (value: T) => Node<T>;
  insertAt: (index: number, value: T) => Node<T>;
  removeAt: (index: number) => Node<T> | null;
  removeHead: () => Node<T> | null;
  removeTail: () => Node<T> | null;
  getSize: () => number;
  toArray: () => T[];
};

export function LinkedList<T>(): LinkedListReturn<T> {
  let head: Node<T> | null = null;
  let tail: Node<T> | null = null;
  let size: number = 0;

  const CreateNode = <T>({ value, next = null, prev = null }: Node<T>): Node<T> => ({
    value,
    next,
    prev,
  });

  type IsOutOfRangeErrorProps = {
    index: number;
    max: number;
    error: string;
  };

  const isOutOfRangeError = ({ index, max, error }: IsOutOfRangeErrorProps): void => {
    if (index < 0 || index > max) {
      throw new Error(error);
    }
  };

  const findNodeByIndex = (index: number): Node<T> | undefined => {
    if (!head || !tail || index < 0 || index > size) return undefined;

    let findNode: Node<T> = head!;
    let findIndex = 0;

    while (findIndex < index) {
      findNode = findNode.next!;
      findIndex++;
    }

    return findNode;
  };

  const insertAt = (index: number, value: T): Node<T> => {
    isOutOfRangeError({
      index,
      max: size,
      error: `Can't insert at ${index} index: out of range`,
    });

    // add the 1st element
    if (!head || !tail) {
      const node = CreateNode({ value });
      [head, tail] = [node, node];
      size++;
      return head;
    }

    // prepend
    if (index === 0) {
      const node = CreateNode({ value, next: head });
      [head.prev, head] = [node, node];
      size++;
      return head;
    }

    // append
    if (index === size) {
      const node = CreateNode({ value, prev: tail });
      [tail.next, tail] = [node, node];
      size++;
      return tail;
    }

    // insert at index
    const indexNode: Node<T> = findNodeByIndex(index)!;
    const prevNode = indexNode.prev!;
    const node = CreateNode({ value, next: indexNode, prev: prevNode });
    [prevNode.next, indexNode.prev] = [node, node];

    size++;

    return node;
  };

  const removeAt = (index: number): Node<T> | null => {
    const laseIndex = size - 1;

    isOutOfRangeError({
      index,
      max: laseIndex,
      error: `Can't remove at ${index} index: out of range`,
    });

    // list is empty
    if (!head || !tail) return null;

    // delete head
    if (index === 0) {
      const removedHead = head;
      [head, head.prev] = [head.next!, null];
      size--;
      return removedHead;
    }

    // delete tail
    if (index === laseIndex) {
      const removedTail = tail;
      [tail, tail.next] = [tail.prev!, null];
      size--;
      return removedTail;
    }

    // remove at index
    const removedNode: Node<T> = findNodeByIndex(index)!;
    const prevNode = removedNode.prev!;
    const nextNode = removedNode.next!;
    [prevNode.next, nextNode.prev] = [nextNode, prevNode];

    size--;
    return removedNode;
  };

  const prepend = (value: T): Node<T> => insertAt(0, value);

  const append = (value: T): Node<T> => insertAt(size, value);

  const removeHead = (): Node<T> | null => removeAt(0);

  const removeTail = (): Node<T> | null => removeAt(size - 1);

  const toArray = (): T[] => {
    let curr = head;
    let res: T[] = [];

    while (curr) {
      res.push(curr.value);
      curr = curr.next ?? null;
    }

    return res;
  };

  const getSize = (): number => size;

  return { append, prepend, insertAt, removeHead, removeAt, removeTail, getSize, toArray };
}
