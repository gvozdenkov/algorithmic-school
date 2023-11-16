import { SortDirection } from '#shared/types';

export type SortProps<T> = {
  array: T[];
  order?: SortDirection;
};
