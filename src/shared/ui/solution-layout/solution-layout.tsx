import { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';
import { ReturnButton } from '../return-button/return-button';
import styles from './solution-layout.module.scss';
import logo from '../../../images/logo.svg';
import clsx from 'clsx';
import { ROUTE } from '#shared/config';

type SolutionLayoutProps = PropsWithChildren & {
  title: string;
};

export const SolutionLayout = ({ title, children }: SolutionLayoutProps) => {
  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <header className={styles.header}>
          <div className={styles.logo}>
            <img className={styles.logo__image} src={logo} />
            <h1 className={clsx(`text text_type_md text_color_gradient`, styles.logo__title)}>
              Fibonacci Algorithmic School
            </h1>
          </div>
        </header>
        <main className={styles.main}>
          <Link className={styles.main__backBtn} to={ROUTE.HOME}>
            <ReturnButton color='#cdd9e5'>Back</ReturnButton>
          </Link>
          <h3 className={clsx('text text_type_sm', styles.main__title)}>{title}</h3>
          <div className={styles.main__result}>{children}</div>
        </main>
        <footer className={styles.footer}>
          <p className={clsx('text text_type_paragraph text_color_mute')}>
            &copy; Powered by Practicum
          </p>
        </footer>
      </div>
    </div>
  );
};
