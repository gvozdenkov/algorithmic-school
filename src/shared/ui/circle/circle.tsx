import React from 'react';
import s from './circle.module.scss';
import { ElementState } from '#shared/types';
import clsx from 'clsx';

type CircleProps = {
  state?: ElementState;
  letter?: string;
  head?: string | React.ReactElement | null | false;
  index?: number;
  tail?: string | React.ReactElement | null | false;
  tailType?: 'string' | 'element';
  extraClass?: string;
  isSmall?: boolean;
};

export const Circle = ({
  state = 'default',
  letter,
  head,
  index,
  tail,
  extraClass = '',
  isSmall,
}: CircleProps) => {
  return (
    <div className={clsx(s.circle, { [extraClass]: !!extraClass })}>
      <div
        className={clsx(
          'text mb-4',
          {
            [s.circle__head_type_string]: typeof head === 'string',
          },
          {
            [s.circle__head_type_element]: typeof head !== 'string',
          },
        )}>
        {head}
      </div>
      <div
        className={clsx(s[`circle__shape_state_${state}`], {
          [s.circle__shape_small]: isSmall,
        })}>
        <p className={clsx('text', s.circle__text)}>{letter}</p>
      </div>
      <p className={clsx('text mt-4', s.circle__index)}>{index?.toString()}</p>
      <div
        className={clsx(
          'text mt-4',
          { [s.circle__tail_type_string]: typeof tail === 'string' },
          { [s.circle__tail_type_element]: typeof tail !== 'string' },
        )}>
        {tail}
      </div>
    </div>
  );
};
