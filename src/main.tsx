import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Rutas } from './Routing/Routes';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Rutas />
  </React.StrictMode>
);
