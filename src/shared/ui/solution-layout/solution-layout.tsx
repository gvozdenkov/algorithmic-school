import { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';

import { ReturnButton } from '..';
import clsx from 'clsx';

import { ROUTE } from '#shared/config';

import styles from './solution-layout.module.scss';

type SolutionLayoutProps = PropsWithChildren & {
  title: string;
};

export const SolutionLayout = ({ title, children }: SolutionLayoutProps) => {
  return (
    <div className={styles.main}>
      <Link className={styles.main__backBtn} to={ROUTE.HOME}>
        <ReturnButton color='#cdd9e5'>Back</ReturnButton>
      </Link>
      <h3 className={clsx('text', styles.main__title)}>{title}</h3>
      <div className={styles.main__result}>{children}</div>
    </div>
  );
};
