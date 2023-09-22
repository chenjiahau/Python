import { useReducer, createContext } from 'react';
import { cloneDeep } from 'lodash';

const defaultState = {
  selectedDeviceModelName: null,  // DBG-X1000, DBG-X800, DBG-2000(B1), DBG-2000
  quickVpn: [],
  quickVpnSettings: [],
  manualVpnConfiguration: [],
  ikeProfiles: []
};

export const siteToSiteVpnAction = {
  setSelectedDeviceModelName: 'SET_DEVICE_MODEL_NAME',
  setQuickVpn: 'SET_QUICK_VPN',
  setQuickVpnSettings: 'SET_QUICK_VPN_SETTINGS',
  setManualVpnConfiguration: 'SET_MANUAL_VPN_CONFIGURATION',
  setIkeProfiles: 'SET_IKE_PROFILES',
}

const configReducer = (state, action) => {
  switch (action.type) {
    case siteToSiteVpnAction.setSelectedDeviceModelName:
      return {
        ...state,
        selectedDeviceModelName: action.payload
      };
    case siteToSiteVpnAction.setQuickVpn:
      return {
        ...state,
        quickVpn: action.payload
      };
    case siteToSiteVpnAction.setQuickVpnSettings:
      return {
        ...state,
        quickVpnSettings: action.payload
      };
    case siteToSiteVpnAction.setManualVpnConfiguration:
      return {
        ...state,
        manualVpnConfiguration: action.payload
      };
    case siteToSiteVpnAction.setIkeProfiles:
      return {
        ...state,
        ikeProfiles: action.payload
      };
    default:
      return defaultState;
  }
}

export const SiteToSiteVpnContext = createContext();
export const SiteToSiteVpnContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(configReducer, cloneDeep(defaultState));

  return (
    <SiteToSiteVpnContext.Provider value={{ state, dispatch }}>
      {children}
    </SiteToSiteVpnContext.Provider>
  )
}