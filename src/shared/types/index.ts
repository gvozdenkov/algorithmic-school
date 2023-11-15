export type SortDirection = 'asc' | 'desc';
export type ElementState = 'default' | 'changing' | 'modified';

export type AnimationState = 'add' | 'delete' | 'idle';
export type ColorValueHex = `#${string}`;

export type StateGenerator<T> = {
  arr: T[];
  state: ElementState[];
};
