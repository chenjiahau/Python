import { useReducer, createContext } from 'react';
import { cloneDeep } from 'lodash';

const defaultState = {
  selectedDeviceModelName: null,  // DBG-X1000, DBG-X800, DBG-2000(B1), DBG-2000
  openVpnUIDisplaying: {},
  openVpnSettings: {},
  serverPolicies: [],
  remoteNetworks: [],
  localNetworks: [],
  clientList: [],
  importClientList: [],
  clientConnection: [],
  accessServerClientConnection: [],
  omniSslPortalLayout: []
};

export const openVpnAction = {
  setSelectedDeviceModelName: 'SET_DEVICE_MODEL_NAME',
  setOpenVpnUIDisplaying: 'SET_OPEN_VPN_UI_DISPLAYING',
  setOpenVpnSettings: 'SET_OPEN_VPN_SETTINGS',
  setServerPolicies: 'SET_SERVER_POLICIES',
  setRemoteNetworks: 'SET_REMOTE_NETWORKS',
  setLocalNetworks: 'SET_LOCAL_NETWORKS',
  setClientList: 'SET_CLIENT_LIST',
  setImportClientList: 'SET_IMPORT_CLIENT_LIST',
  setClientConnection: 'SET_CLIENT_CONNECTION',
  setAccessServerClientConnection: 'SET_ACCESS_SERVER_CLIENT_CONNECTION',
  setOmniSslPortalLayout: 'SET_OMNI_SSL_PORTAL_LAYOUT',
}

const configReducer = (state, action) => {
  switch (action.type) {
    case openVpnAction.setSelectedDeviceModelName:
      return {
        ...state,
        selectedDeviceModelName: action.payload
      };
    case openVpnAction.setOpenVpnUIDisplaying:
      return {
        ...state,
        openVpnUIDisplaying: action.payload
      };
    case openVpnAction.setOpenVpnSettings:
      return {
        ...state,
        openVpnSettings: action.payload
      };
    case openVpnAction.setServerPolicies:
      return {
        ...state,
        serverPolicies: action.payload
      };
    case openVpnAction.setRemoteNetworks:
      return {
        ...state,
        remoteNetworks: action.payload
      };
    case openVpnAction.setLocalNetworks:
      return {
        ...state,
        localNetworks: action.payload
      };
    case openVpnAction.setClientList:
      return {
        ...state,
        clientList: action.payload
      };
    case openVpnAction.setImportClientList:
      return {
        ...state,
        importClientList: action.payload
      };
    case openVpnAction.setClientConnection:
      return {
        ...state,
        clientConnection: action.payload
      };
    case openVpnAction.setAccessServerClientConnection:
      return {
        ...state,
        accessServerClientConnection: action.payload
      };
    case openVpnAction.setOmniSslPortalLayout:
      return {
        ...state,
        omniSslPortalLayout: action.payload
      };
    default:
      return defaultState;
  }
}

export const OpenVpnContext = createContext();
export const OpenVpnContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(configReducer, cloneDeep(defaultState));

  return (
    <OpenVpnContext.Provider value={{ state, dispatch }}>
      {children}
    </OpenVpnContext.Provider>
  )
}