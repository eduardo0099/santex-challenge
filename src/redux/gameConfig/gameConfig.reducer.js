import { SET_GAME_CONFIG } from './gameConfig.types';

const INITIAL_STATE = {
  nTurns: 0,
  turnsUnlimited: false,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_GAME_CONFIG:
      const { nTurns, flagUnlimited } = action.data;
      return {
        ...state, nTurns, turnsUnlimited: flagUnlimited,
      };
    default:
      return state;
  }
};

export default reducer;