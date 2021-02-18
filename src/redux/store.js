import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './reducer';

const enhancer = composeWithDevTools();

const store = createStore(rootReducer, enhancer);

export default store;