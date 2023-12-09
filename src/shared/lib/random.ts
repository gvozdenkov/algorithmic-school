export const generateRandomArray = (n: number, max: number = 100) =>
  [...Array<number>(n)].map(() => Math.floor(max * Math.random()));

export const randomIntFromInterval = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);
