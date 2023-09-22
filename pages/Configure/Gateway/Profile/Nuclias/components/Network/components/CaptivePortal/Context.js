import { useReducer, createContext } from 'react';
import { cloneDeep } from 'lodash';

const defaultState = {
  splashPage: [],
  localDb: [],
  ldap: [],
  radius: [],
  sms: [],
  walledGarden: [],
  ssidAndVlan: [],
  cp: [],
};

export const captivePortalAction = {
  setSplashPage: 'SET_SPLASH_PAGE',
  setLocalDb: 'SET_LOCAL_DB',
  setLdap: 'SET_LDAP',
  setRadius: 'SET_RADIUS',
  setSms: 'SET_SMS',
  setWalledGarden: 'SET_WALLED_GARDEN',
  setSsidAndVlan: 'SET_SSID_AND_VLAN',
  setCp: 'SET_CP',
}

const configReducer = (state, action) => {
  switch (action.type) {
    case captivePortalAction.setSplashPage:
      return {
        ...state,
        splashPage: action.payload
      };
    case captivePortalAction.setLocalDb:
      return {
        ...state,
        localDb: action.payload
      };
    case captivePortalAction.setLdap:
      return {
        ...state,
        ldap: action.payload
      };
    case captivePortalAction.setRadius:
      return {
        ...state,
        radius: action.payload
      };
    case captivePortalAction.setSms:
      return {
        ...state,
        sms: action.payload
      };
    case captivePortalAction.setWalledGarden:
      return {
        ...state,
        walledGarden: action.payload
      };
    case captivePortalAction.setSsidAndVlan:
      return {
        ...state,
        ssidAndVlan: action.payload
      };
    case captivePortalAction.setCp:
      return {
        ...state,
        cp: action.payload
      };
    default:
      return defaultState;
  }
}

export const CaptivePortalContext = createContext();
export const CaptivePortalContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(configReducer, cloneDeep(defaultState));

  return (
    <CaptivePortalContext.Provider value={{ state, dispatch }}>
      {children}
    </CaptivePortalContext.Provider>
  )
}