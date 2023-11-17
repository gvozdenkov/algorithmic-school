import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './index.scss';

import { Providers } from '#app/providers';

const container = document.getElementById('root');
const root = container && createRoot(container);

root &&
  root.render(
    <StrictMode>
      <Providers />
    </StrictMode>,
  );
