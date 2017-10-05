const SHOW_FORM = 'SHOW_FORM';
const SHOW_FORM_STEPS = 'SHOW_FORM_STEPS';
const SHOW_POPUP = 'SHOW_POPUP';
const SHOW_PEOPLE_TAB = 'SHOW_PEOPLE_TAB';

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

export function showPopUp(visible, currentImage, activePopUp) {
  return {
    type: SHOW_POPUP,
    visible,
    currentImage,
    activePopUp,
  };
}

export function showActivePeopleTab(peopleTab) {
  return {
    type: SHOW_PEOPLE_TAB,
    peopleTab
  };
}


/* ============
   | REDUCER  |
   ============ */

const initialState = {
  activeForm: 'default',
  activeFormSteps: 'step-1',
  visible: false,
  currentImage: '',
  activePeopleTab: 'people',
  activePopUp: '',
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
        currentImage: action.currentImage,
        activePopUp: action.activePopUp,
        file: action.file,
      };
    }

    case SHOW_PEOPLE_TAB: {
      return {
        ...state,
        activePeopleTab: action.peopleTab
      };
    }

    default:
      return state;
  }
}
