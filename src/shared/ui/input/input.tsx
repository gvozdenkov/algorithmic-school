import { ComponentProps, forwardRef } from 'react';
import styles from './input.module.scss';
import clsx from 'clsx';

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
      <div className={clsx(styles.content, { [extraClass]: !!extraClass })}>
        <input
          className={`${styles.input} text text_type_input text_color_input`}
          placeholder={placeholder}
          type={type}
          maxLength={maxLength}
          max={maxLength}
          ref={ref}
          {...rest}
        />
        {isLimitText && (
          <span className={`text text_type_input-lim text_color_input mt-2 ml-8 ${styles.limit}`}>
            {limitText}
          </span>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';
