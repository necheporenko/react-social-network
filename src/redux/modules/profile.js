const SAVE_PROFILE = 'SAVE_PROFILE';
const SAVE_PROFILE_SUCCESS = 'SAVE_PROFILE_SUCCESS';
const SAVE_PROFILE_FAIL = 'SAVE_PROFILE_FAIL';
const LOAD_PROFILE = 'LOAD_PROFILE';
const LOAD_PROFILE_SUCCESS = 'LOAD_PROFILE_SUCCESS';
const LOAD_PROFILE_FAIL = 'LOAD_PROFILE_FAIL';

const initialState = {
  userProfile: {
    bio: '',
    occupation: '',
    company: '',
    country: '',
    location: '',
    birthDate: '',
    birthMonth: '',
    birthDateVisibility: 1,
    birthYear: '',
    birthYearVisibility: 1,
    twitter: '',
    facebook: '',
    linkedin: '',
    website: '',
    phone: '',
    skype: ''
  },
  loaded: false,
};

export default function profileReducer(state = initialState, action) {
  switch (action.type) {
    case SAVE_PROFILE:
      return {
        ...state,
        saved: false,
      };
    case SAVE_PROFILE_SUCCESS:
      return {
        ...state,
        saved: true,
        userProfile: action.result.data
      };
    case SAVE_PROFILE_FAIL:
      return {
        ...state,
        saved: false,
        error: action.error,
      };

    case LOAD_PROFILE:
      return {
        ...state,
        loaded: false,
      };
    case LOAD_PROFILE_SUCCESS:
      console.log('LOAD_PROFILE_SUCCESS', action.result.data);
      return {
        ...state,
        loaded: true,
        userProfile: action.result.data
      };
    case LOAD_PROFILE_FAIL:
      return {
        ...state,
        loaded: false,
        error: action.error,
      };

    default:
      return state;
  }
}

export function isLoadedProfile(globalState) {
  return globalState.profile && globalState.profile.loaded;
}

export function save(profile) {
  return {
    types: [SAVE_PROFILE, SAVE_PROFILE_SUCCESS, SAVE_PROFILE_FAIL],
    promise: (client) => client.post('/engagment/profile', { data: profile })
  };
}

export function load() {
  return {
    types: [LOAD_PROFILE, LOAD_PROFILE_SUCCESS, LOAD_PROFILE_FAIL],
    promise: (client) => client.get('/user/profile')
  };
}
