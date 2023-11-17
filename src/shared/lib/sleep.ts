export const sleep = async (milliseconds: number): Promise<unknown> =>
  new Promise((res) => setTimeout(res, milliseconds));
