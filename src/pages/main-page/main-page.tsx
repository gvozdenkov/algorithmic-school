import Marquee from 'react-fast-marquee';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

import { MenuCard } from '#shared/ui';
import { menuList } from '#shared/config';

import s from './main-page.module.scss';

export const MainPage = () => {
  return (
    <>
      <ul className={clsx(s.cardList)}>
        {menuList.map((item, i) => (
          <li key={i}>
            <Link className={s.cardList__link} to={item.route} data-test={`menu-link-${i}`}>
              <MenuCard title={item.title} image={item.image} />
            </Link>
          </li>
        ))}
      </ul>
      <Marquee className={clsx('full-width', s.ticker)} gradient={false} speed={200}>
        <p className={`text text_type_ticker text_color_secondary ${s.ticker_text}`}>
          Вдохновлено школами, в которых не учили алгоритмам
        </p>
        <div className={s.dot_box}>
          <p className={s.dot} />
        </div>
      </Marquee>
    </>
  );
};
