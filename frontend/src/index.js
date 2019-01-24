import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import ReactModal from 'react-modal';
import { createStore } from './store';
import App from './App';

const rootElement = document.getElementById('root');

ReactModal.setAppElement(rootElement);

ReactDOM.render((
  <Provider store={createStore()}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
), rootElement);
