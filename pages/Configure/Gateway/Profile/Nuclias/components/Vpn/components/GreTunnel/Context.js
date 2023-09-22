import { useReducer, createContext } from 'react';
import { cloneDeep } from 'lodash';

const defaultState = {
  selectedDeviceModelName: null,  // DBG-X1000, DBG-X800, DBG-2000(B1), DBG-2000
  greTunnelConfiguration: []
};

export const greTunnelAction = {
  setSelectedDeviceModelName: 'SET_DEVICE_MODEL_NAME',
  setGreTunnelConfiguration: 'SET_GRE_TUNNEL_CONFIGURATION',
}

const configReducer = (state, action) => {
  switch (action.type) {
    case greTunnelAction.setSelectedDeviceModelName:
      return {
        ...state,
        selectedDeviceModelName: action.payload
      };
    case greTunnelAction.setGreTunnelConfiguration:
      return {
        ...state,
        greTunnelConfiguration: action.payload
      };
    default:
      return defaultState;
  }
}

export const GreTunnelContext = createContext();
export const GreTunnelContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(configReducer, cloneDeep(defaultState));

  return (
    <GreTunnelContext.Provider value={{ state, dispatch }}>
      {children}
    </GreTunnelContext.Provider>
  )
}