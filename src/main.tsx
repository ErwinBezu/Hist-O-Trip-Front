import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './components/App/App';

import './styles/index.scss';
import { CategoryProvider } from './components/contexts/CategoryContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <CategoryProvider>
      <App />
    </CategoryProvider>
  </BrowserRouter>
);
