import { useReducer, createContext } from 'react';
import { cloneDeep } from 'lodash';

const defaultState = {
  interface: [],
  schedule: [],
  splashPage: [],
  wcfCategory: [],
  webContentFilterList: [],
  customWarningPage: [],
  customGroupList: [],
};

export const wcfAction = {
  setInterface: 'SET_INTERFACE',
  setSchedule: 'SET_SCHEDULE',
  setSplashPage: 'SET_SPLASH_PAGE',
  setWcfCategory: 'SET_WCF_CATEGORY',
  setWebContentFilterList: 'SET_WEB_CONTENT_FILTER_LIST',
  setCustomWarningPage: 'SET_CUSTOM_WARNING_PAGE',
  setCustomGroupList: 'SET_CUSTOM_GROUP_LIST',
}

const configReducer = (state, action) => {
  switch (action.type) {
    case wcfAction.setInterface:
      return {
        ...state,
        interface: action.payload,
      }
    case wcfAction.setSchedule:
      return {
        ...state,
        schedule: action.payload,
      }
    case wcfAction.setSplashPage:
      return {
        ...state,
        splashPage: action.payload,
      }
    case wcfAction.setWcfCategory:
      return {
        ...state,
        wcfCategory: action.payload,
      }
    case wcfAction.setWebContentFilterList:
      return {
        ...state,
        webContentFilterList: action.payload,
      }
    case wcfAction.setCustomWarningPage:
      return {
        ...state,
        customWarningPage: action.payload,
      }
    case wcfAction.setCustomGroupList:
      return {
        ...state,
        customGroupList: action.payload,
      }
    default:
      return defaultState;
  }
}

export const WcfContext = createContext();
export const WcfContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(configReducer, cloneDeep(defaultState));

  return (
    <WcfContext.Provider value={{ state, dispatch }}>
      {children}
    </WcfContext.Provider>
  )
}