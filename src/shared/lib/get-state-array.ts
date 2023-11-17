import { ElementState } from '#shared/types';

export const getStateArray = (length: number, state?: ElementState): ElementState[] =>
  [...Array(length)].map<ElementState>(() => state ?? 'default');
