import clsx from 'clsx';

import { ElementState } from '#shared/types';

import s from './column.module.scss';

type ColumnProps = {
  index: number;
  state?: ElementState;
  extraClass?: string;
};

export const Column = ({ index, state = 'default', extraClass = '' }: ColumnProps) => (
  <div className={clsx(s.content, { [extraClass]: !!extraClass })}>
    <div
      className={clsx(s.column, s[`column__state_${state}`])}
      style={{ height: (320 * index) / 100 || 1 }}
    />
    <p className={clsx('text text_color_input mt-3', s.column__index)}>{index}</p>
  </div>
);
