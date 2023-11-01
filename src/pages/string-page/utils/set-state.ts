export const setState = (startIndex: number, endIndex: number, index: number) => {
  if (index === startIndex || index === endIndex) return 'changing';
  if (index < startIndex || index > endIndex || startIndex === endIndex) return 'modified';

  return 'default';
};
