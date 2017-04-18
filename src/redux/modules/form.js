export const SHOW_FORM = 'SHOW_FORM';
export const SHOW_FORM_STEPS = 'SHOW_FORM_STEPS';

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


/* ============
   | REDUCER  |
   ============ */

const initialState = {
  activeForm: 'default',
  activeFormSteps: 'step-1'
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
    default:
      return state;
  }
}
