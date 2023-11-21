import { createHashRouter } from 'react-router-dom';

import { ROUTE } from '#shared/config';
import { BaseLayout } from '#shared/ui';

export const router = createHashRouter([
  {
    path: ROUTE.HOME,
    element: <BaseLayout />,
    children: [
      {
        path: ROUTE.HOME,
        lazy: async () => ({
          Component: (await import('../pages/main-page')).MainPage,
        }),
      },
      {
        path: ROUTE.RECURSION,
        lazy: async () => ({
          Component: (await import('../pages/string-page')).StringPage,
        }),
      },
      {
        path: ROUTE.FIBONACCI,
        lazy: async () => ({
          Component: (await import('../pages/fibonacci-page')).FibonacciPage,
        }),
      },
      {
        path: ROUTE.SORTING,
        lazy: async () => ({
          Component: (await import('../pages/sorting-page')).SortingPage,
        }),
      },
      {
        path: ROUTE.STACK,
        lazy: async () => ({
          Component: (await import('../pages/stack-page')).StackPage,
        }),
      },
      {
        path: ROUTE.QUEUE,
        lazy: async () => ({
          Component: (await import('../pages/queue-page')).QueuePage,
        }),
      },
      {
        path: ROUTE.LIST,
        lazy: async () => ({
          Component: (await import('../pages/list-page')).ListPage,
        }),
      },
    ],
  },
]);
