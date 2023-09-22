import { useReducer, createContext } from 'react';
import { cloneDeep } from 'lodash';

const defaultState = {
  selectedDeviceModelName: null,  // DBG-X1000, DBG-X800, DBG-2000(B1), DBG-2000
  serverMode: [],
  clientMode: []
};

export const pptpL2tpAction = {
  setSelectedDeviceModelName: 'SET_DEVICE_MODEL_NAME',
  setServerMode: 'SET_SERVER_MODE',
  setClientMode: 'SET_CLIENT_MODE',
}

const configReducer = (state, action) => {
  switch (action.type) {
    case pptpL2tpAction.setSelectedDeviceModelName:
      return {
        ...state,
        selectedDeviceModelName: action.payload
      };
    case pptpL2tpAction.setServerMode:
      return {
        ...state,
        serverMode: action.payload
      };
    case pptpL2tpAction.setClientMode:
      return {
        ...state,
        clientMode: action.payload
      };
    default:
      return defaultState;
  }
}

export const PptpL2tpContext = createContext();
export const PptpL2tpContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(configReducer, cloneDeep(defaultState));

  return (
    <PptpL2tpContext.Provider value={{ state, dispatch }}>
      {children}
    </PptpL2tpContext.Provider>
  )
}