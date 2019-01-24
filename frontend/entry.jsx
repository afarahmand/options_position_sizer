import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
// import configureStore from './store/store';

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById('root');
  // let store;
  // let preloadedState = {};

  // store = configureStore(preloadedState);

  // window.getState = store.getState;
  // window.dispatch = store.dispatch;

  // ReactDOM.render(<Root store={ store } />, root);
  ReactDOM.render(<Root />, root);
});
