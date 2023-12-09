import { ValueOf } from '#shared/types';
import { ROUTE } from '.';

export type MenuItem = 'string' | 'fibonacci' | 'sorting' | 'stack' | 'queue' | 'linked-list';

export type MenuCard = {
  title: string;
  route: ValueOf<typeof ROUTE>;
  image: MenuItem;
};

export const menuList: MenuCard[] = [
  {
    image: 'string',
    route: 'recursion',
    title: 'String',
  },
  {
    image: 'fibonacci',
    route: 'fibonacci',
    title: 'Fibonacci',
  },
  {
    image: 'sorting',
    route: 'sorting',
    title: 'Array sorting',
  },
  {
    image: 'stack',
    route: 'stack',
    title: 'Stack',
  },
  {
    image: 'queue',
    route: 'queue',
    title: 'Queue',
  },
  {
    image: 'linked-list',
    route: 'list',
    title: 'Linked list',
  },
];
