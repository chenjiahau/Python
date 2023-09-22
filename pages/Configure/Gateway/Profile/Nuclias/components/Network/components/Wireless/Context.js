import { useReducer, createContext } from 'react';
import { cloneDeep } from 'lodash';

const defaultState = {
  ssids: [],
  radio: {},
};

export const wirelessAction = {
  setSsids: 'SET_SSIDS',
  setRadio: 'SET_RADIO',
}

const configReducer = (state, action) => {
  switch (action.type) {
    case wirelessAction.setSsids:
      return {
        ...state,
        ssids: action.payload
      };
    case wirelessAction.setRadio:
      return {
        ...state,
        radio: action.payload
      };
    default:
      return defaultState;
  }
}

export const WirelessContext = createContext();
export const WirelessContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(configReducer, cloneDeep(defaultState));

  return (
    <WirelessContext.Provider value={{ state, dispatch }}>
      {children}
    </WirelessContext.Provider>
  )
}