import { SET_GAME_CONFIG } from './gameConfig.types';

export const setGameConfig = (nTurns, flagUnlimited) => {
  return {
    type: SET_GAME_CONFIG,
    data: {
      nTurns,
      flagUnlimited,
    }
  };
};
