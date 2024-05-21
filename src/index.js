import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { store } from './redux/store.js'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom';
import { LoadingProvider } from '~/hooks/LoadingContext';
import { ToastContainer } from 'react-toastify';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Provider store={store}>
      <LoadingProvider>
        <App />
      </LoadingProvider>
    </Provider>
    <ToastContainer />
  </Router>
);

