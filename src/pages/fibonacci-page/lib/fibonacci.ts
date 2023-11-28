const getFibonacciValue = (n: number): number =>
  n < 2 ? 1 : getFibonacciValue(n - 2) + getFibonacciValue(n - 1);

const getFibonacciArray = (n: number): number[] =>
  [...Array<number>(n)].map((_, i) => getFibonacciValue(i));

/**
 * Generator. Return array of fib numbers form 0 to n-th index
 *
 * @yields {IterableIterator<number[]>} array with +1 fibonacci number
 */
export function* fibonacci(n: number): IterableIterator<number[]> {
  const fibArray = getFibonacciArray(n + 1);

  for (let i = 0; i <= n + 1; i++) {
    yield fibArray.slice(0, i);
  }
}
