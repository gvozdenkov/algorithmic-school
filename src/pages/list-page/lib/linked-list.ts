type Node<T> = {
  value: T;
  next?: Node<T> | null;
};

const CreateNode = <T>({ value, next = null }: Node<T>): Node<T> => ({
  value,
  next,
});

type LinkedListReturn<T> = {
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

      prevNode!.next = null;
    }

    size--;
  };

  // insertAtHead
  const prepend = (value: T): void => insertAt(0, value);

  // insertAtTail
  const append = (value: T): void => insertAt(size, value);

  const deleteHead = (): void => removeAt(0);

  const deleteTail = (): void => removeAt(size - 1);

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
