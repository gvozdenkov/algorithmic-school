/**
 * @async
 * @function
 * @name sleep
 * Pause code execution
 * @example
 * // Pause 1 second
 * sleep(1000);
 * @param {Number} milliseconds Delay duration in milliseconds
 * @returns {Promise<unknown>} Empty Promise
 */
export const sleep = async (milliseconds: number): Promise<unknown> =>
  new Promise((res) => setTimeout(res, milliseconds));
