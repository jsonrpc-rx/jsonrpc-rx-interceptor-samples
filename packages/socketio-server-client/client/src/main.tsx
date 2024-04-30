import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { SocketContextProvider } from './socket/socket-context';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SocketContextProvider>
      <App />
    </SocketContextProvider>
  </React.StrictMode>,
);
