import { useReducer, createContext } from 'react';
import { cloneDeep } from 'lodash';

const defaultState = {
  selectedDeviceModelName: null,  // DBG-X1000, DBG-X800, DBG-2000(B1), DBG-2000
  ipsecVpnServer: [],
  ikeProfiles: []
};

export const clientToSiteVpnAction = {
  setSelectedDeviceModelName: 'SET_DEVICE_MODEL_NAME',
  setIpsecVpnServer: 'SET_IP_SEC_VPN_SERVER',
  setIkeProfiles: 'SET_IKE_PROFILES',
}

const configReducer = (state, action) => {
  switch (action.type) {
    case clientToSiteVpnAction.setSelectedDeviceModelName:
      return {
        ...state,
        selectedDeviceModelName: action.payload
      };
    case clientToSiteVpnAction.setIpsecVpnServer:
      return {
        ...state,
        ipsecVpnServer: action.payload
      };
    case clientToSiteVpnAction.setIkeProfiles:
      return {
        ...state,
        ikeProfiles: action.payload
      };
    default:
      return defaultState;
  }
}

export const ClientToSiteVpnContext = createContext();
export const ClientToSiteVpnContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(configReducer, cloneDeep(defaultState));

  return (
    <ClientToSiteVpnContext.Provider value={{ state, dispatch }}>
      {children}
    </ClientToSiteVpnContext.Provider>
  )
}