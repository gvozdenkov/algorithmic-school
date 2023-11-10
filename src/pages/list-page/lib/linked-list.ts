type Node<T> = {
  value: T;
  next?: Node<T> | null;
  prev?: Node<T> | null;
};

const CreateNode = <T>({ value, next = null, prev = null }: Node<T>): Node<T> => ({
  value,
  next,
  prev,
});

export type LinkedListReturn<T> = {
  append: (value: T) => void;
  prepend: (value: T) => void;
  insertAt: (index: number, value: T) => void;
  removeAt: (index: number) => void;
  deleteHead: () => void;
  deleteTail: () => void;
  getSize: () => number;
  toArray: () => T[];
};

export function LinkedList<T>(): LinkedListReturn<T> {
  let head: Node<T> | null = null;
  let tail: Node<T> | null = null;
  let size: number = 0;

  const isOutOfRangeError = (index: number, error: string): void => {
    if (index < 0 || index > size) {
      throw new Error(error);
    }
  };

  const insertAt = (index: number, value: T): void => {
    isOutOfRangeError(index, `Can't insert at ${index} index: out of range`);

    if (head === null) {
      const node = CreateNode({ value });
      head = node;
    } else {
      let prevNode = null;
      let currNode: Node<T> | null = head;
      let currIndex = 0;

      while (currIndex < index) {
        prevNode = currNode;
        currNode = currNode?.next ?? null;
        currIndex++;
      }

      if (!prevNode) {
        const node = CreateNode({ value, next: head });
        head = node;
      } else {
        const node = CreateNode({ value });
        prevNode.next = node;
        node.next = currNode;
      }
    }

    size++;
  };

  const removeAt = (index: number): void => {
    isOutOfRangeError(index, `Can't remove at ${index} index: out of range`);

    if (!head) return;

    if (index === 0) {
      head = head.next ?? null;
    } else {
      let prevNode = null;
      let currNode = head;
      let currIndex = 0;

      while (currIndex < index) {
        prevNode = currNode;
        currNode = currNode.next!;
        currIndex++;
      }

      prevNode!.next = currNode.next;
    }

    size--;
  };

  // insertAtHead
  const prepend = (value: T): void => {
    const node = CreateNode({ value, next: head });

    if (head) head.prev = node;
    head = node;
    size++;
  };

  // insertAtTail
  const append = (value: T): void => {
    const node = CreateNode({ value, prev: tail });

    if (tail) tail.next = node;
    if (!head) head = node;
    tail = node;
    size++;
  };

  const deleteHead = (): void => removeAt(0);

  const deleteTail = (): void => {
    tail = tail?.prev ?? null;
    if (tail) tail.next = null;
    size--;
  };

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

  return { append, prepend, insertAt, deleteHead, removeAt, deleteTail, getSize, toArray };
}
