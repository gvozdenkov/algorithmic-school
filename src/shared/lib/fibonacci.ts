/**
 * @function
 * @name fibonacciValue
 * Find n-th element of Fibonacci sequence
 * @example
 * const fib = fibonacciValue(7);
 * console.log(fib) // 21
 * @param {Number} n
 */
export const getFibonacciValue = (n: number): number => {
  return n < 2 ? 1 : getFibonacciValue(n - 2) + getFibonacciValue(n - 1);
};

/**
 * @function
 * @name fibonacciArray
 * return array of Fibonacci sequence
 * @example
 * const fib = fibonacciArray(5);
 * console.log(fib) // [1, 1, 2, 3, 5]
 * @param {Number} n
 */
export const getFibonacciArray = (n: number): number[] => {
  return [...Array(n + 1)].map((_, i) => getFibonacciValue(i));
};
