import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { Providers } from '#app/providers';

import './index.scss';

const container = document.getElementById('root');
const root = container && createRoot(container);

root &&
  root.render(
    <StrictMode>
      <Providers />
    </StrictMode>,
  );
