import { HEAD, TAIL } from '#shared/constants';
import { ElementState } from '#shared/types';

export type CircleState = {
  color: ElementState[];
  value?: (string | number)[];
  head?: (typeof HEAD | '')[];
  tail?: (typeof TAIL | '')[];
  index?: number[];
};
