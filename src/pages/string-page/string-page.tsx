import { FormEvent, useState } from 'react';
import clsx from 'clsx';
import s from './string-page.module.scss';

import { SolutionLayout } from '#shared/ui/solution-layout';
import { Input } from '#shared/ui/input';
import { Button } from '#shared/ui/button';
import { Circle } from '#shared/ui/circle';

export const StringComponent = () => {
  const [string, setString] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isLoader, setIsLoader] = useState(false);

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    setString(e.currentTarget.value);
  };

  const handleClick = () => {
    setShowResult(true);
    setIsLoader(true);
  };

  return (
    <SolutionLayout title="Строка">
      <div className={s.string}>
        <div className={s.string__inputContainer}>
          <Input maxLength={11} isLimitText onChange={handleChange} value={string} />
          <Button text="Развернуть" onClick={handleClick} isLoader={isLoader} />
        </div>
        {showResult && (
          <div className={clsx(s.result, s.string__result)}>
            {string.split('').map((letter, i) => {
              return <Circle letter={letter} key={i} />;
            })}
          </div>
        )}
      </div>
    </SolutionLayout>
  );
};
