export const SHOW_FORM = 'SHOW_FORM';
export const SHOW_FORM_STEPS = 'SHOW_FORM_STEPS';
export const SHOW_POPUP = 'SHOW_POPUP';

export function showActiveForm(formName) {
  return {
    type: SHOW_FORM,
    formName
  };
}

export function showActiveFormSteps(formSteps) {
  return {
    type: SHOW_FORM_STEPS,
    formSteps
  };
}

export function showPopUp(visible, currentImage) {
  return {
    type: SHOW_POPUP,
    visible,
    currentImage,
  };
}


/* ============
   | REDUCER  |
   ============ */

const initialState = {
  activeForm: 'default',
  activeFormSteps: 'step-1',
  visible: false,
  currentImage: ''
};

export default function formsReducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_FORM: {
      return {
        ...state,
        activeForm: action.formName
      };
    }

    case SHOW_FORM_STEPS: {
      return {
        ...state,
        activeFormSteps: action.formSteps
      };
    }

    case SHOW_POPUP: {
      return {
        ...state,
        visible: action.visible,
        currentImage: action.currentImage
      };
    }

    default:
      return state;
  }
}
