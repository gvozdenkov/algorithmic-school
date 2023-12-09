import { Outlet } from 'react-router-dom';
import clsx from 'clsx';

import logo from '../../../images/logo.svg';
import s from './base-layout.module.scss';

export const BaseLayout = () => {
  return (
    <div className={clsx('content-grid', s.page)}>
      <header className={s.header}>
        <div className={s.logo}>
          <img className={s.logo__image} src={logo} />
          <h1
            className={clsx(`text text_type_md text_color_gradient`, s.logo__title)}
            data-test='h1-title'>
            Fibonacci Algorithmic School
          </h1>
        </div>
      </header>
      <main className={clsx('content-grid full-width', s.main)}>
        <Outlet />
      </main>
      <footer className={s.footer}>
        <p className={clsx('text text_type_paragraph text_color_mute', s.footer__copyright)}>
          &copy; Powered by Practicum
        </p>
      </footer>
    </div>
  );
};
