export type SortDirection = 'asc' | 'desc';
export type ElementStates = 'default' | 'changing' | 'modified';

export type DataItem<T> = {
  value: T;
  state?: ElementStates;
};
