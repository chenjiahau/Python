import { useReducer, createContext } from 'react';
import { cloneDeep } from 'lodash';

const defaultState = {
  vlans: [],
  ips: {},
  attackChecks: {},
};

export const ipsAction = {
  setVlans: 'setVlans',
  setIps: 'setIps',
  setAttackChecks: 'setAttackChecks',
}

const configReducer = (state, action) => {
  switch (action.type) {
    case ipsAction.setVlans:
      return {
        ...state,
        vlans: action.payload,
      }
    case ipsAction.setIps:
      return {
        ...state,
        ips: action.payload,
      }
    case ipsAction.setAttackChecks:
      return {
        ...state,
        attackChecks: action.payload,
      }
    default:
      return defaultState;
  }
}

export const IpsContext = createContext();
export const IpsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(configReducer, cloneDeep(defaultState));

  return (
    <IpsContext.Provider value={{ state, dispatch }}>
      {children}
    </IpsContext.Provider>
  )
}