import { ComponentPropsWithoutRef, PropsWithChildren } from 'react';
import clsx from 'clsx';
import { ReturnIcon } from '../icons/return-icon';

import styles from './return-button.module.scss';

type ButtonProps = PropsWithChildren<ComponentPropsWithoutRef<'button'>> & {
  htmlType?: 'button' | 'submit' | 'reset';
  color?: string;
  extraClass?: string;
};

export const ReturnButton = ({
  htmlType = 'button',
  color = '#cdd9e5',
  extraClass = '',
  children,
  ...rest
}: ButtonProps) => {
  return (
    <button
      className={clsx('text text_type_button text_color_primary', styles.button, {
        [extraClass]: !!extraClass,
      })}
      style={{ color }}
      type={htmlType}
      {...rest}>
      <ReturnIcon color={color} />
      {children}
    </button>
  );
};
