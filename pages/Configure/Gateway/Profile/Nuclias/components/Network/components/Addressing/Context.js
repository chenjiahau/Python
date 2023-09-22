import { useReducer, createContext } from 'react';
import { cloneDeep } from 'lodash';

const defaultState = {
  vlan: [],
  ipManagementList: [],
};

export const addressingAction = {
  setVlan: 'SET_VLAN',
  setIpManagementList: 'SET_IP_MANAGEMENT_LIST',
}

const configReducer = (state, action) => {
  switch (action.type) {
    case addressingAction.setVlan:
      return {
        ...state,
        vlan: action.payload
      };
    case addressingAction.setIpManagementList:
      return {
        ...state,
        ipManagementList: action.payload
      };
    default:
      return defaultState;
  }
}

export const AddressingContext = createContext();
export const AddressingContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(configReducer, cloneDeep(defaultState));

  return (
    <AddressingContext.Provider value={{ state, dispatch }}>
      {children}
    </AddressingContext.Provider>
  )
}