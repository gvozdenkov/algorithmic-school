import { Link } from 'react-router-dom';

import clsx from 'clsx';

import { menuList } from '#shared/config';

import { MenuCard } from '#shared/ui';

import s from './main-page.module.scss';

export const MainPage = () => {
  return (
    <>
      <ul className={clsx(s['card-list'])}>
        {menuList.map((item, i) => (
          <li key={i}>
            <Link className={s.cardList__link} to={item.route} data-test={`menu-link-${i}`}>
              <MenuCard title={item.title} image={item.image} />
            </Link>
          </li>
        ))}
      </ul>
      <div className={clsx('full-width', s.ticker)}>
        <p className={clsx('text', s.ticker__text)}>
          Вдохновлено школами, в которых не учили алгоритмам
        </p>
      </div>
    </>
  );
};
