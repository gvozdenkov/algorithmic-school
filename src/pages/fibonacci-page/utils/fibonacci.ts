const getFibonacciValue = (n: number): number => {
  return n < 2 ? 1 : getFibonacciValue(n - 2) + getFibonacciValue(n - 1);
};

export function* fibonacci(n: number): IterableIterator<number[]> {
  for (let i = 0; i <= n; i++) {
    yield [...Array(i + 1)].map((_, index) => getFibonacciValue(index));
  }
}
