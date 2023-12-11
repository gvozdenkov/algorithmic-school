import { HTMLProps } from 'react';

import clsx from 'clsx';

import { SortDirection } from '#shared/types';

import loaderIcon from '../../../images/icons/loader.svg';
import { AscendingIcon } from '../icons/ascending-icon';
import { DescendingIcon } from '../icons/descending-icon';

import s from './button.module.scss';

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
  const fill = isLoader ? 'transparent' : '#e4e4e4';
  const currentIcon =
    sorting === 'asc' ? <AscendingIcon fill={fill} /> : <DescendingIcon fill={fill} />;

  return (
    <button
      className={clsx(
        'text_type_button',
        s.button,
        { [s.linkedList]: linkedList },
        { [s.loader]: isLoader },
        { [extraClass]: !!extraClass },
      )}
      type={type}
      disabled={isLoader || disabled}
      {...rest}>
      {sorting && currentIcon}
      <p className={clsx('text', { 'ml-5': sorting }, { [s.hiddenText]: isLoader })}>{text}</p>

      {isLoader && (
        <img
          className={s.loader_icon}
          src={loaderIcon}
          height={'50%'}
          alt='Loading'
          data-test='loader'
        />
      )}
    </button>
  );
};
