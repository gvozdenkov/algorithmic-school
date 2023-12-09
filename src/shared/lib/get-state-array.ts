import { ElementState } from '#shared/types';

export const getStateArray = (length: number, state?: ElementState): ElementState[] =>
  [...Array<ElementState>(length)].map<ElementState>(() => state ?? 'default');
