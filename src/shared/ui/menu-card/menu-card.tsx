import clsx from 'clsx';

import { MenuItem } from '#shared/config';
import s from './menu-card.module.scss';

type MenuCardProps = {
  title?: string;
  image: MenuItem;
};

export const MenuCard = ({ title = '', image }: MenuCardProps) => {
  return (
    <div className={s.menuCard}>
      <h2 className={clsx('text text_color_primary text_type_paragraph-m', s.menuCard__title)}>
        {title}
      </h2>
      <img src={`/images/menu/${image}.svg`} className={s.menuCard__image} />
    </div>
  );
};
