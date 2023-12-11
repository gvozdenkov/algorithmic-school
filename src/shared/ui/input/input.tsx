import { ComponentProps, forwardRef } from 'react';

import clsx from 'clsx';

import s from './input.module.scss';

type InputProps = ComponentProps<'input'> & {
  placeholder?: string;
  extraClass?: string;
  isLimitText?: boolean;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      placeholder = 'Введите текст',
      extraClass = '',
      type = 'text',
      maxLength,
      isLimitText = false,
      ...rest
    },
    ref,
  ) => {
    const limitText =
      type === 'text' ? `Максимум — ${maxLength} символа` : `Максимальное число — ${maxLength}`;

    return (
      <div className={clsx(s.content, { [extraClass]: !!extraClass })}>
        <input
          className={`${s.input} text text_type_input text_color_input`}
          placeholder={placeholder}
          type={type}
          maxLength={maxLength}
          max={maxLength}
          ref={ref}
          {...rest}
        />
        {isLimitText && (
          <span className={`text text_type_input-lim text_color_input mt-2 ml-8 ${s.limit}`}>
            {limitText}
          </span>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';
