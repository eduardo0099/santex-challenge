import { combineReducers } from 'redux';

import gameConfigReducer from './gameConfig/gameConfig.reducer';
import confirmationModalReducer from './confirmationModal/confirmationModal.reducer';

const reducers = combineReducers({
  gameConfig: gameConfigReducer,
  confirmationModal: confirmationModalReducer,
});

export default reducers;