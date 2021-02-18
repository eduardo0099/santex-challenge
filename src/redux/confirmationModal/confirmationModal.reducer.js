import { SET_MODAL_TEXT, SET_BUTTON_CALLBACK } from './confirmationModal.types';

const INITIAL_STATE = {
  textContent: "",
  confirmedCallback: () => {},
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_MODAL_TEXT:
      const { textContent } = action.data;
      return {
        ...state, textContent, confirmedCallback: () => {},
      };
    case SET_BUTTON_CALLBACK:
      const { buttonCallback } = action.data;
      return {
        ...state, confirmedCallback: buttonCallback,
      };
    default:
      return state;
  }
};

export default reducer;