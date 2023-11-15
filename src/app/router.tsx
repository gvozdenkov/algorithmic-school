import { createHashRouter } from 'react-router-dom';

import { FibonacciPage } from '#pages/fibonacci-page';
import { ListPage } from '#pages/list-page';
import { MainPage } from '#pages/main-page';
import { QueuePage } from '#pages/queue-page';
import { SortingPage } from '#pages/sorting-page';
import { StackPage } from '#pages/stack-page';
import { StringPage } from '#pages/string-page';
import { ROUTE } from '#shared/config';

export const router = createHashRouter([
  {
    path: ROUTE.HOME,
    element: <MainPage />,
  },
  {
    path: ROUTE.RECURSION,
    element: <StringPage />,
  },
  {
    path: ROUTE.FIBONACCI,
    element: <FibonacciPage />,
  },
  {
    path: ROUTE.SORTING,
    element: <SortingPage />,
  },
  {
    path: ROUTE.STACK,
    element: <StackPage />,
  },
  {
    path: ROUTE.QUEUE,
    element: <QueuePage />,
  },
  {
    path: ROUTE.LIST,
    element: <ListPage />,
  },
]);
