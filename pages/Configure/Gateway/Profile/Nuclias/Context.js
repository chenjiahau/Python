import { useReducer, createContext } from 'react';
import { cloneDeep } from 'lodash';

const defaultState = {
  tabChangeTime: 0,
  profile: null,
  device: null,
  useProfileConfig: false
};

export const configAction = {
  setProfile: 'SET_PROFILE',
  setDevice: 'SET_DEVICE',

  setUseProfileConfig: 'SET_USER_PROFILE_CONFIG'
}

const configReducer = (state, action) => {
  switch (action.type) {
    case configAction.setProfile:
      return {
        ...state,
        profile: action.payload
      };
    case configAction.setDevice:
      return {
        ...state,
        device: action.payload
      };
    case configAction.setUseProfileConfig:
      return {
        ...state,
        useProfileConfig: action.payload
      };
    default:
      return defaultState;
  }
}

export const ConfigContext = createContext();
export const ConfigContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(configReducer, cloneDeep(defaultState));

  return (
    <ConfigContext.Provider value={{ state, dispatch }}>
      {children}
    </ConfigContext.Provider>
  )
}