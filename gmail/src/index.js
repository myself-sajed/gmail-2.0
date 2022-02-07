import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './store'
import { Provider } from 'react-redux'
import { BrowserRouter as BR } from 'react-router-dom';
;


ReactDOM.render(
  <Provider store={store}>
    <BR>
      <App />

    </BR>
  </Provider>,
  document.getElementById('root')
);


