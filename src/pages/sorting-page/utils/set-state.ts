export const setStateSelect = (startIndex: number, endIndex: number, index: number) => {
  if (index === startIndex || index === endIndex) return 'changing';
  if (index < startIndex) return 'modified';

  return 'default';
};
