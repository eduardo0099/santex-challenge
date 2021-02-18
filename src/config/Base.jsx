import React from 'react';
import App from '@views/App';
import { Provider } from 'react-redux';
import store from '@redux/store';

const Root = () => (
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);

export default Root;