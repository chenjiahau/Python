import { useReducer, createContext } from 'react';
import { cloneDeep } from 'lodash';

const defaultState = {
  ports: [],
  interfaces: [],
  defaultWan: {},
  wanMode: {},
  dynamicDns: []
};

export const ethernetAction = {
  setPorts: 'SET_PORTs',
  setInterfaces: 'SET_INTERFACES',
  setDefaultWan: 'SET_DEFAULT_WAN',
  setWanMode: 'SET_WAN_MODE',
  setDynamicDns: 'SET_DYNAMIC_DNS'
}

const configReducer = (state, action) => {
  switch (action.type) {
    case ethernetAction.setPorts:
      return {
        ...state,
        ports: action.payload
      };
    case ethernetAction.setInterfaces:
      return {
        ...state,
        interfaces: action.payload
      };
    case ethernetAction.setDefaultWan:
      return {
        ...state,
        defaultWan: action.payload
      };
    case ethernetAction.setWanMode:
      return {
        ...state,
        wanMode: action.payload
      };
    case ethernetAction.setDynamicDns:
      return {
        ...state,
        dynamicDns: action.payload
      };
    default:
      return defaultState;
  }
}

export const EthernetContext = createContext();
export const EthernetContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(configReducer, cloneDeep(defaultState));

  return (
    <EthernetContext.Provider value={{ state, dispatch }}>
      {children}
    </EthernetContext.Provider>
  )
}