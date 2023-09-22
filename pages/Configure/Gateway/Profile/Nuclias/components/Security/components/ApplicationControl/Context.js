import { useReducer, createContext } from 'react';
import { cloneDeep } from 'lodash';

const defaultState = {
  interface: [],
  schedule: [],
  appCtrl: {},
  autoUpgrade: {},
  appCtrlList: [],
  customGroupList: {},
};

export const appCtrlAction = {
  setInterface: 'SET_INTERFACE',
  setSchedule: 'SET_SCHEDULE',
  setAppCtrl: 'SET_APP_CTRL',
  setAutoUpgrade: 'SET_AUTO_UPGRADE',
  setAppCtrlList: 'SET_APP_CTRL_LIST',
  setCustomGroupList: 'SET_CUSTOM_GROUP_LIST',
}

const configReducer = (state, action) => {
  switch (action.type) {
    case appCtrlAction.setInterface:
      return {
        ...state,
        interface: action.payload,
      };
    case appCtrlAction.setSchedule:
      return {
        ...state,
        schedule: action.payload,
      };
    case appCtrlAction.setAppCtrl:
      return {
        ...state,
        appCtrl: action.payload,
      };
    case appCtrlAction.setAutoUpgrade:
      return {
        ...state,
        autoUpgrade: action.payload,
      };
    case appCtrlAction.setAppCtrlList:
      return {
        ...state,
        appCtrlList: action.payload,
      };
    case appCtrlAction.setCustomGroupList:
      return {
        ...state,
        customGroupList: action.payload,
      };
    default:
      return defaultState;
  }
}

export const AppCtrlContext = createContext();
export const AppCtrlContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(configReducer, cloneDeep(defaultState));

  return (
    <AppCtrlContext.Provider value={{ state, dispatch }}>
      {children}
    </AppCtrlContext.Provider>
  )
}