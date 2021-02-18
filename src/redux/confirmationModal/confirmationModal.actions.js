import { SET_MODAL_TEXT, SET_BUTTON_CALLBACK } from './confirmationModal.types';

export const setModalText = (textContent) => {
  return {
    type: SET_MODAL_TEXT,
    data: {
      textContent,
    }
  };
};

export const setButtonCallback = (callback) => {
  return {
    type: SET_BUTTON_CALLBACK,
    data: {
      buttonCallback: callback,
    }
  };
};
