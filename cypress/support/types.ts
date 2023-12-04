import { HEAD, TAIL } from '#shared/constants';
import { ElementState } from '#shared/types';

export type State = {
  color: ElementState[];
  letter: string[];
};

export type DataCircleState = State & {
  head?: (typeof HEAD | '')[];
  tail?: (typeof TAIL | '')[];
  index?: string[];
};
