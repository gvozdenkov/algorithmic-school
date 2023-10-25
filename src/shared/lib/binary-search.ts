export const binarySearch = (arr: number[], n: number, start = 0, end = arr.length - 1): number => {
  if (end >= start) {
    const mid = Math.floor((end + start) / 2);

    if (arr[mid] === n) {
      return mid;
    }

    if (n < arr[mid]) {
      return binarySearch(arr, n, start, mid - 1);
    } else {
      return binarySearch(arr, n, mid + 1, end);
    }
  }

  return -1;
};
