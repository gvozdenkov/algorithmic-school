import { HTMLProps } from 'react';
import clsx from 'clsx';

import loaderIcon from '../../../images/icons/loader.svg';
import { AscendingIcon } from '../icons/ascending-icon';
import { DescendingIcon } from '../icons/descending-icon';
import { SortDirection } from '#shared/types';

import styles from './button.module.scss';

type ButtonProps = HTMLProps<HTMLButtonElement> & {
  text?: string;
  type?: 'button' | 'submit' | 'reset';
  sorting?: SortDirection;
  linkedList?: 'small' | 'big';
  isLoader?: boolean;
  extraClass?: string;
};

export const Button = ({
  text,
  extraClass = '',
  type = 'button',
  isLoader = false,
  sorting,
  linkedList,
  disabled,
  ...rest
}: ButtonProps) => {
  const currentIcon = sorting === 'asc' ? <AscendingIcon /> : <DescendingIcon />;

  return (
    <button
      className={clsx(
        'text_type_button text_color_primary',
        styles.button,
        { [styles.linkedList]: linkedList },
        { [styles.loader]: isLoader },
        { [extraClass]: !!extraClass },
      )}
      type={type}
      disabled={isLoader || disabled}
      {...rest}>
      {isLoader ? (
        <img className={styles.loader_icon} src={loaderIcon} alt='Загрузка.' />
      ) : (
        <>
          {sorting && currentIcon}
          <p className={clsx('text', { 'ml-5': sorting })}>{text}</p>
        </>
      )}
    </button>
  );
};
